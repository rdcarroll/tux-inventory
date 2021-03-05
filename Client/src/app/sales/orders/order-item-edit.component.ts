import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import * as moment from 'moment';

import {  ApiClientService, Util } from '../../../common/core';
import { Customer, InventoryType } from '../../admin';
import { Order, OrderItem } from '../sales';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'order-item-edit',
    templateUrl: './order-item-edit.component.html'
})
export class OrderItemEditComponent implements OnInit {
    
    @Input() item: any;
    inventory_types: any;
    inventory: any;

    constructor(
        private ApiClient: ApiClientService,
        private route: ActivatedRoute,
        private util: Util,
        private router: Router
    ) { 
    }

    changeInventoryType(){
        this.getStyles(this.item.InventoryItem.Inventory.InventoryType.ID).subscribe(res=>{
            
        });
    }
    changeStyle(){

    }

    getInventoryTypes(): Observable<any> {
        return this.ApiClient.pGet(`inventory_types`, {}).pipe(take(1))
        .pipe(map((res: any) => {
            this.inventory_types = res;
        }));
    }
    getStyles(inventoryTypeID:number): Observable<any> {
        return this.ApiClient.pGet(`inventory`, {'inventory_type':inventoryTypeID}).pipe(take(1))
        .pipe(map((res: any) => {
            this.inventory = res;
        }));
    }
    ngOnInit(): void {
        this.getInventoryTypes().subscribe(res=>{
            this.changeInventoryType();
            // this.getOrderItems().subscribe(res=>{
            //     if (res.length==0) {
            //         this.setDefault();
            //     }
            //     else{
            //         this.orderitems = res;
            //     }
            // });
        });
    }
    setDefault() {
        // let tList = [];
        // for(const invtype of this.inventory_types){
        //     let tItem = new OrderItem();
        //     tItem.OrderID=this.order.ID;
        //     tItem.CustomerID=this.order.CustomerID;
        //     tItem.StatusID=2;
        //     tItem.EmployeeID=this.user.Id;
        //     tItem.InventoryItem = {
        //         Inventory:{InventoryType:{ID:invtype.ID,Name:invtype.Name}},
        //         Price:0
        //     }
        //     tList.push(tItem);
        // }
        // this.orderitems = tList;
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