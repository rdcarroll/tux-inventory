import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { map, take } from 'rxjs/operators';

import { ApiClientService, Util } from '../../../../common/core';
import { Order } from '../../sales';
import { forkJoin, Observable } from 'rxjs';
import * as moment from 'moment';
import * as root from '../../../../common/globals';

@Component({
    selector: 'event-print',
    templateUrl: './event-print.component.html'
})
export class EventPrintComponent implements OnChanges {

    @Input() id: number;
    @Input() mode: string;
    @Output() action : EventEmitter<boolean> = new EventEmitter<boolean>();
    order_items: any[];
    order: any;
    

    constructor(
        private ApiClient: ApiClientService
    ) { 
     
    }

    getOrderItems(orderid:number): Observable<any> {
        let q = {include:['InventoryItem',{'Inventory':['InventoryType']}]}
        return this.ApiClient.pGet(`orders/${orderid}/order_items`, q).pipe(take(1),map((res: any) => {
            this.order_items = res;
        }));
    }
    getOrder(orderid:number): Observable<any> {
        let q = {include:['Customer']}
        return this.ApiClient.pGet(`orders/${orderid}`, q).pipe(take(1),map((res: any) => {
            this.order = res;
        }));
    }
    ngOnChanges(): void {
        if(this.id){
            this.getOrder(this.id).subscribe(res=>{
                this.getOrderItems(this.id)
                .subscribe(res => {
                    setTimeout(() => {
                        this.action.emit(true);
                    }, 500);
                 }, (err) => {
                    this.action.emit(false);
                });
            }, (err) => {
                this.action.emit(false);
            });
        }
    }
}