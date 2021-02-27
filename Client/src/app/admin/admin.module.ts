import { NgModule } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailComponent } from './employees/employee-detail.component';
import { customersComponent } from './customers/customers.component';
import { CustomerDetailComponent } from './customers/customer-detail.component';

//import { AppConnector, Application, Building, Company, Database, Department, Domain, Group, Server, Site } from './sitedata';

@NgModule({
    imports: [
        SharedModule,
        AdminRoutingModule
    ],
    declarations: [
        AdminComponent,
        EmployeesComponent,
        EmployeeDetailComponent,
        customersComponent,
        CustomerDetailComponent
    ]
})
export class AdminModule { }