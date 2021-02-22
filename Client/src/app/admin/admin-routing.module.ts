import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, AdminGuard } from '../../common/core';

import { AdminComponent } from './admin.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailComponent } from './employees/employee-detail.component';

const routes: Routes = [
    {
        path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard],
        children: [
            { path: 'employees', component: EmployeesComponent },
            { path: 'employees/:id', component: EmployeeDetailComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    //exports: [RouterModule]
})
export class AdminRoutingModule { }