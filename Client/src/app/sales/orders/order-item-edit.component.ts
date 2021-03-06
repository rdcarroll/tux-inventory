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
    invtypeid: number;
    invmodel: string;
    statusid: number;
    price: number;

    constructor(
        private ApiClient: ApiClientService,
        private route: ActivatedRoute,
        private util: Util,
        private router: Router
    ) { 
    }

    changeInventoryType(inventoryTypeID:number){
        this.getStyles(inventoryTypeID).subscribe(res=>{
            
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
        let q = {filter:"InventoryTypeID|7",include:['InventoryType']}
        return this.ApiClient.pGet(`inventory`, {'InventoryTypeID':inventoryTypeID}).pipe(take(1))
        .pipe(map((res: any) => {
            this.inventory = res;
        }));
    }
    ngOnInit(): void {
        this.invtypeid = this.item.InventoryItem.Inventory.InventoryType.ID;
        this.invmodel =  this.item.InventoryItem.Inventory.ModelName;
        this.price = this.item.InventoryItem.Inventory.Price;
        this.statusid =  this.item.InventoryItem.StatusID;

        this.getInventoryTypes().subscribe(res=>{
            this.changeInventoryType(this.invtypeid);
            
        });
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