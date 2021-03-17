import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import * as moment from 'moment';

import {  ApiClientService, CurrentUser, SecurityService, Util } from '../../../common/core';
import { Customer, InventoryType } from '../../admin';
import { Order, OrderItem } from '../sales';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'order-ticket',
    templateUrl: './order-ticket.component.html'
})
export class OrderTicketComponent implements OnInit, OnChanges  {
    
    @Input() order: Order;
    @Output() ticketChange = new EventEmitter<object>();
    user: CurrentUser;
    order_tickets: any;
    subtotal:number;
    tax:number;
    total:number;
    paid:number;
    adjustment:number;
    balancedue:number;
    ticketnumber: any;
    customername: any;
    createddate: any;
    ticketitems: any[];
    orderitems: any;


    constructor(
        private ApiClient: ApiClientService,
        private security: SecurityService,
        private route: ActivatedRoute,
        private util: Util,
        private router: Router
    ) { 
    }

    getOrderItems(OrderID:number): Observable<any> {
        let q = {include:[{'InventoryItem':[{'Inventory':['InventoryType']}]}]}
        return this.ApiClient.pGet(`orders/${OrderID}/order_items`, q).pipe(take(1))
        .pipe(map((res: any) => {
            this.orderitems = res;
        }));
    }

    getOrderTickets(OrderID:number): Observable<any> {
        let q = {filter:`OrderID|${OrderID}`,include:['Customer']}
        return this.ApiClient.pGet(`order_tickets`, q).pipe(take(1))
        .pipe(map((res: any) => {
            if(res){
                
                let myticket = res[0] || {Customer:null};
                this.ticketnumber = myticket.ID || "No Ticket Found";
                this.customername = myticket.Customer.FullName || "No Customer Found";
                this.createddate = myticket.createdAt || null;
                
                this.subtotal = myticket.SubTotal || 0;
                this.tax = myticket.Tax || 0;
                this.total = myticket.Total || 0;
                this.adjustment = myticket.Adjustment || 0;
                this.paid =  0;
                this.balancedue = 0;
            }
        }));
    }
    ngOnChanges(changes: SimpleChanges): void {
        let orderID = this.order.ID;
        this.getOrderTickets(orderID).subscribe(res=>{
            this.getOrderItems(orderID).subscribe(res=>{
                //         this.orderitems = res;
            });
        });
    }
    ngOnInit(): void {
        this.user = this.security.getUser();
        // this.getOrderTickets(this.order.ID).subscribe(res=>{
            
        // });
    }
    
    paymentChanged(evt:any): void {
        this.ticketChange.emit(evt);
    }
    close(): void {
        
    }

}