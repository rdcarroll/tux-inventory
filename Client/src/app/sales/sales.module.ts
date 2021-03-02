import { NgModule } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';

import { SalesRoutingModule } from './sales-routing.module';

import { SalesComponent } from './sales.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from './orders/order-detail.component';

//import { AppConnector, Application, Building, Company, Database, Department, Domain, Group, Server, Site } from './sitedata';

@NgModule({
    imports: [
        SharedModule,
        SalesRoutingModule
    ],
    declarations: [
        SalesComponent,
        OrdersComponent,
        OrderDetailComponent
    ]
})
export class SalesModule { }