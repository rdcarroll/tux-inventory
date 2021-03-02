import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, AdminGuard } from '../../common/core';

import { SalesComponent } from './sales.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from './orders/order-detail.component';

const routes: Routes = [
    {
        path: 'sales', component: SalesComponent, canActivate: [AuthGuard, AdminGuard],
        children: [
            { path: 'orders', component: OrdersComponent },
            { path: 'orders/:id', component: OrderDetailComponent } 
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    //exports: [RouterModule]
})
export class SalesRoutingModule { }