import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { ApiClientService, Util } from '../../../common/core';
import { Customer } from '../admin';
import { Router } from '@angular/router';

@Component({
    selector: 'customer-detail',
    templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent implements OnInit {
    
    item: Customer;
    id: string;

    constructor(
        private ApiClient: ApiClientService,
        private route: ActivatedRoute,
        private util: Util,
        private router: Router
    ) { }


    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id === 'add') {
            this.item = new Customer();
        }
        else {
            this.ApiClient.pGet("customers/" + this.id, {}).pipe(take(1))
                .subscribe(res => this.item = res);
        }
    }

    add(): void {
        this.ApiClient.pPost("customers", {}, this.item).pipe(take(1))
            .subscribe(res => {
                this.item = res;
                this.id = this.item.ID.toString();
                this.router.navigate(['/admin', 'customers', this.item.ID]);
                this.util.alert("success", "Success Adding Customer", false, { icon: 'check' }, true);
            }, (err) => {
                this.util.handleError(err, "Error Adding");
            });
    }

    save(): void {
        this.ApiClient.pPut("customers/" + this.id, {}, this.item).pipe(take(1))
            .subscribe(res => {
                this.router.navigate(['/admin', 'customers']);
                this.util.alert("success", "Success Saving Customer", false, { icon: 'check' }, true);
            }, (err) => {
                this.util.handleError(err, "Error Saving");
            });
    }

}