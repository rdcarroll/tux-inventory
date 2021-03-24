import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import * as moment from 'moment';

import { ApiClientService, Util } from '../../../common/core';
import { Customer } from '../sales';
import { Order } from '../sales';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'order-detail',
    templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent implements OnInit {

    @ViewChild('ticketTab') ticketTab: any;
    order: Order;
    id: string;
    backto: string[]=['/sales/orders'];
    customer_id: any;
    customers: any[];
    customer: Customer;

    constructor(
        private ApiClient: ApiClientService,
        private route: ActivatedRoute,
        private util: Util,
        private router: Router
    ) { }

    getOrder(id:string):  Observable<any> {
        return this.ApiClient.pGet("orders/" + this.id, {}).pipe(take(1))
        .pipe(map((res: any) => {
            this.order = res;
        }));
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.customer_id = this.route.snapshot.queryParams["customer_id"];
        this.getLookups().subscribe(res=>{
            if (this.id === 'add') {
                this.order = new Order();
                this.order.createdAt = moment().toDate();
                if(this.customer_id){
                    this.backto = ['/sales/customers',this.customer_id];
                    this.order.CustomerID = this.customer_id;
                } 
            }
            else {
                this.getOrder(this.id)
                    .subscribe(res => {});
            }
        });
    }
    getCustomerByID(): Observable<any> {
        return this.ApiClient.pGet(`customers/${this.customer_id}`, {}).pipe(take(1))
        .pipe(map((res: any) => {
            this.customer = res;
        }));
    }

    getLookups(): Observable<any> {
        return forkJoin([this.ApiClient.pGet("customers", {}).pipe(take(1))])
        .pipe(map((res: any) => {
            this.customers = res[0];
        }));
    }

    add(frm:any): void {
        this.ApiClient.pPost("orders", {}, this.order).pipe(take(1))
            .subscribe(res => {
                this.order = res;
                this.id = this.order.ID.toString();
                this.router.navigate(this.backto);
                this.util.alert("success", "Success Adding Order", false, { icon: 'check' }, true);
            }, (err) => {
                this.util.handleError(err, "Error Adding");
            });
    }

    save(frm:any): void {
        this.ApiClient.pPut("orders/" + this.id, {}, this.order).pipe(take(1))
            .subscribe(res => {
                this.router.navigate(this.backto);
                this.util.alert("success", "Success Saving Order", false, { icon: 'check' }, true);
            }, (err) => {
                this.util.handleError(err, "Error Saving");
            });
    }
    useDateChanged(evt:Date): void {
        let uDate = moment(evt);
        this.order.useDate = evt;
        this.order.pickUpDate = uDate.subtract(4,'days').toDate();
        this.order.returnDate = uDate.add(4,'days').toDate();
    }
    actualReturnDateChanged(evt:Date): void {
        let uDate = evt;
        this.order.actualReturnDate = evt;
    }
    listChange(evt:any): void {
        this.getOrder(this.id)
            .subscribe(res => {});
    }

}