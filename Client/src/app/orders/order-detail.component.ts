import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';

import { ApiClientService, Util } from '../../common/core';
import { Customer, Order } from '../admin';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';

@Component({
    selector: 'order-detail',
    templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent implements OnInit {
    
    item: Order;
    id: string;
    backto: string[]=['/orders'];
    customer_id: any;
    inventorytypes: any;
    customer: Customer;

    constructor(
        private ApiClient: ApiClientService,
        private route: ActivatedRoute,
        private util: Util,
        private router: Router
    ) { }


    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.customer_id = this.route.snapshot.queryParams["customer_id"];
        if (this.id === 'add') {
            this.item = new Order();
        }
        else {
            this.ApiClient.pGet("orders/" + this.id, {}).pipe(take(1))
                .subscribe(res => this.item = res);
        }
        if(this.customer_id){
            this.backto = ['/admin/customers',this.customer_id];
            this.item.CustomerID = this.customer_id;
            this.getCustomerByID().subscribe(res=>{
                this.item.Customer = res;
            });
        } 
    }
    getCustomerByID(): Observable<any> {
        return this.ApiClient.pGet(`customers/${this.customer_id}`, {}).pipe(take(1))
        .pipe(map((res: any) => {
            this.customer = res;
        }));
    }

    getLookups(): Observable<any> {
        return forkJoin([this.ApiClient.pGet("inventory_types", {}).pipe(take(1))])
        .pipe(map((res: any) => {
            this.inventorytypes = res[0];
        }));
    }

    add(): void {
        this.ApiClient.pPost("orders", {}, this.item).pipe(take(1))
            .subscribe(res => {
                this.item = res;
                this.id = this.item.ID.toString();
                this.router.navigate(this.backto);
                this.util.alert("success", "Success Adding Order", false, { icon: 'check' }, true);
            }, (err) => {
                this.util.handleError(err, "Error Adding");
            });
    }

    save(): void {
        this.ApiClient.pPut("orders/" + this.id, {}, this.item).pipe(take(1))
            .subscribe(res => {
                this.router.navigate(this.backto);
                this.util.alert("success", "Success Saving Order", false, { icon: 'check' }, true);
            }, (err) => {
                this.util.handleError(err, "Error Saving");
            });
    }

}