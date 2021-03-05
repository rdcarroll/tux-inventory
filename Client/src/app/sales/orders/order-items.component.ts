import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import * as moment from 'moment';

import { SecurityService, CurrentUser, ApiClientService, Util } from '../../../common/core';
import { Customer, InventoryType } from '../../admin';
import { Order, OrderItem } from '../sales';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'order-items',
    templateUrl: './order-items.component.html'
})
export class OrderItemsComponent implements OnInit {
    
    @Input() order: Order;
    orderitems: OrderItem[];
    inventory_types: InventoryType[];
    user: CurrentUser;

    constructor(
        private ApiClient: ApiClientService,
        private security: SecurityService,
        private route: ActivatedRoute,
        private util: Util,
        private router: Router
    ) { 
    }


    getOrderItems(): Observable<any> {
        return this.ApiClient.pGet(`orders/${this.order.ID}/order_items`, {}).pipe(take(1));
    }
    ngOnInit(): void {
        this.user = this.security.getUser();
        this.getLookups().subscribe(res=>{
            this.getOrderItems().subscribe(res=>{
                if (res.length==0) {
                    this.setDefault();
                }
                else{
                    this.orderitems = res;
                }
            });
        });
    }
    setDefault() {
        let tList = [];
        for(const invtype of this.inventory_types){
            let tItem = new OrderItem();
            tItem.OrderID=this.order.ID;
            tItem.CustomerID=this.order.CustomerID;
            tItem.StatusID=2;
            tItem.EmployeeID=this.user.Id;
            tItem.InventoryItem = {
                Inventory:{InventoryType:{ID:invtype.ID,Name:invtype.Name}},
                Price:0
            }
            tList.push(tItem);
        }
        this.orderitems = tList;
    }
    getLookups(): Observable<any> {
        return forkJoin([this.ApiClient.pGet("inventory_types", {}).pipe(take(1))])
        .pipe(map((res: any) => {
            this.inventory_types= res[0];
        }));
    }

    btnClick(item:any,stype:string): void {
        switch(stype){
            case 'edit':{
                let wasEditing = item.$$editing;
                for (let _item of this.orderitems) {
                    _item.$$editing = false; 
                }
                item.$$editing=!wasEditing;
                break;
            }
            case 'delete':{
                break;
            }
        }
    }

    save(frm:any): void {
        // this.ApiClient.pPut("orders/" + this.id, {}, this.item).pipe(take(1))
        //     .subscribe(res => {
        //         this.util.alert("success", "Success Saving Order", false, { icon: 'check' }, true);
        //     }, (err) => {
        //         this.util.handleError(err, "Error Saving");
        //     });
    }

}