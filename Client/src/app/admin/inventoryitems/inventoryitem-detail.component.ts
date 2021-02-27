import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { ApiClientService, Util } from '../../../common/core';
import { InventoryItem } from '../admin';
import { Router } from '@angular/router';

@Component({
    selector: 'inventoryitem-detail',
    templateUrl: './inventoryitem-detail.component.html'
})
export class InventoryItemDetailComponent implements OnInit {
    
    item: InventoryItem;
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
            this.item = new InventoryItem();
        }
        else {
            this.ApiClient.pGet("inventory_items/" + this.id, {}).pipe(take(1))
                .subscribe(res => this.item = res);
        }
    }

    add(): void {
        this.ApiClient.pPost("inventory_items", {}, this.item).pipe(take(1))
            .subscribe(res => {
                this.item = res;
                this.id = this.item.ID.toString();
                this.router.navigate(['/admin', 'inventoryitems', this.item.ID]);
                this.util.alert("success", "Success Adding Inventory Item", false, { icon: 'check' }, true);
            }, (err) => {
                this.util.handleError(err, "Error Adding");
            });
    }

    save(): void {
        this.ApiClient.pPut("inventory_items/" + this.id, {}, this.item).pipe(take(1))
            .subscribe(res => {
                this.router.navigate(['/admin', 'inventoryitems']);
                this.util.alert("success", "Success Saving Inventory Item", false, { icon: 'check' }, true);
            }, (err) => {
                this.util.handleError(err, "Error Saving");
            });
    }

}