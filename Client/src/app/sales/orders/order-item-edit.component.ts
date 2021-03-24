import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import * as moment from 'moment';

import {  ApiClientService, Util } from '../../../common/core';
import { Customer } from '../sales';
import { Order, OrderItem } from '../sales';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'order-item-edit',
    templateUrl: './order-item-edit.component.html'
})
export class OrderItemEditComponent implements OnInit,OnChanges {
    
    @Input() item: any;
    @Output() itemChange = new EventEmitter<object>();
    @Output() closeEdit = new EventEmitter<boolean>();
    inventory_types: any[];
    inventory: any[];
    inventory_items: any[];
    invtypeid: number;
    invmodelid: number;
    invitemid: number;
    price: number;

    statusid: number;
    invmodeldesc: any;
    confirmed: any;

    constructor(
        private ApiClient: ApiClientService,
        private route: ActivatedRoute,
        private util: Util,
        private router: Router
    ) { 
    }

    changeInventoryType(inventoryTypeID:number, initChild:boolean){
         this.getInventory(inventoryTypeID).subscribe(res=>{
            this.invmodelid = initChild?this.invmodelid : (res[0] ? res[0].ID : null);
             this.changeInventory(this.invmodelid, initChild);
        });
    }
    changeInventory(inventoryID:number, initChild:boolean){
        let inv = this.inventory.filter(inv => {  return inv.ID == inventoryID   })[0] || {};
        this.price = initChild ? this.price : inv.Cost;
        this.invmodeldesc =  initChild ? this.invmodeldesc : inv.Description;
         this.getInventoryItems(inventoryID).subscribe(res=>{
            this.invitemid = initChild?this.invitemid : (res[0] ? res[0].ID : null);
        });
    }
    changeInventoryItem(){
        
    }

    getInventoryTypes(): Observable<any> {
        return this.ApiClient.pGet(`inventory_types`, {}).pipe(take(1))
        .pipe(map((res: any) => {
            this.inventory_types = res;
        }));
    }
    //models/styles
    getInventory(inventoryTypeID:number): Observable<any> {
        let q = {filter:`InventoryTypeID|${inventoryTypeID},ModelName|!"default"`}
        return this.ApiClient.pGet(`inventory`, q).pipe(take(1))
        .pipe(map((res: any) => {
            return this.inventory = res;
        }));
    }
    getInventoryItems(inventoryID:number): Observable<any> {
        let q = {filter:`InventoryID|${inventoryID}`,OrderID:this.item.OrderID}
        return this.ApiClient.pGet(`inventory_items`, q).pipe(take(1))
        .pipe(map((res: any) => {
            return this.inventory_items = res;
        }));
    }
    ngOnChanges(): void {
        this.invtypeid = this.item.InventoryItem.Inventory.InventoryType.ID;
        this.invmodelid =  this.item.InventoryItem.Inventory.ID;
        this.invmodeldesc =  this.item.InventoryItem.Inventory.Description;
        this.invitemid =  this.item.InventoryItem.ID;
        this.statusid =  this.item.InventoryItem.StatusID;
        this.price = this.item.Cost || 0;
        this.confirmed =  this.item.Confirmed;

        this.getInventoryTypes().subscribe(res=>{
            this.changeInventoryType(this.invtypeid, true);
        });
    }
    ngOnInit(): void {
    }
    
    save(): void {
        let nObject = {
            orderid:this.item.ID,
            invitemid :  this.invitemid,
            price : this.price,
            confirmed :  this.confirmed
        }
        let invitem = this.inventory_items.filter(invitem => {  return invitem.ID == this.invitemid   })[0] || {};
        if(invitem && invitem.overbooked){
            if (confirm("The Inventory Item you selected seems to be booked for some of the dates in this Order. Save Anyway?")) {
                this.itemChange.emit(nObject);
            }
        }
        else{
            this.itemChange.emit(nObject);
        }
    }
    close(): void {
            this.closeEdit.emit(true);
    }
    
    pickup(): void {
        this.ApiClient.pPut("order_items/" + this.item.ID + "/pickup", {}, {}).pipe(take(1))
            .subscribe(res => {
                this.util.alert("success", "Success Checking Out Item", false, { icon: 'check' }, true);
                //this.itemChange.emit(res);
                this.statusid =  this.item.InventoryItem.StatusID=3;
            }, (err) => {
                this.util.handleError(err, "Error Checking Out Item");
            });
    }
    return(): void {
        this.ApiClient.pPut("order_items/" + this.item.ID + "/return", {}, {}).pipe(take(1))
            .subscribe(res => {
                this.util.alert("success", "Success Returning Item", false, { icon: 'check' }, true);
                //this.itemChange.emit(res);
                this.statusid =  this.item.InventoryItem.StatusID=2;
            }, (err) => {
                this.util.handleError(err, "Error Returning Item");
            });
    }

}