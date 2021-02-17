import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, AdminGuard } from '../../common/core';

import { AdminComponent } from './admin.component';
import { AdministratorsComponent } from './administrators/administrators.component';
import { AdministratorsDetailComponent } from './administrators/administrators-detail.component';

const routes: Routes = [
    {
        path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard],
        children: [
            { path: 'administrators', component: AdministratorsComponent },
            { path: 'administrators/:id', component: AdministratorsDetailComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    //exports: [RouterModule]
})
export class AdminRoutingModule { }