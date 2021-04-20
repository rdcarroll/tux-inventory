import { NgModule } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';

import { SalesRoutingModule } from './sales-routing.module';

import { SalesComponent } from './sales.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from './orders/order-detail.component';
import { OrderItemsComponent } from './orders/order-items.component';
import { OrderItemEditComponent } from './orders/order-item-edit.component';
import { OrderTicketComponent } from './orders/order-ticket.component';
import { OrderPaymentComponent } from './orders/order-payment.component';
import { customersComponent } from './customers/customers.component';
import { CustomerDetailComponent } from './customers/customer-detail.component';
import { eventsComponent } from './events/events.component';
import { eventDetailComponent } from './events/event-detail.component';

//import { AppConnector, Application, Building, Company, Database, Department, Domain, Group, Server, Site } from './sitedata';

@NgModule({
    imports: [
        SharedModule,
        SalesRoutingModule
    ],
    declarations: [
        SalesComponent,
        OrdersComponent,
        OrderDetailComponent,
        OrderItemsComponent,
        OrderItemEditComponent,
        OrderTicketComponent,
        OrderPaymentComponent,
        customersComponent,
        CustomerDetailComponent,
        eventsComponent,
        eventDetailComponent
    ]
})
export class SalesModule { }