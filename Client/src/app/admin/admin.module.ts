import { NgModule } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { AdministratorsComponent } from './administrators/administrators.component';
import { AdministratorsDetailComponent } from './administrators/administrators-detail.component';

//import { AppConnector, Application, Building, Company, Database, Department, Domain, Group, Server, Site } from './sitedata';

@NgModule({
    imports: [
        SharedModule,
        AdminRoutingModule
    ],
    declarations: [
        AdminComponent,
        AdministratorsComponent,
        AdministratorsDetailComponent
    ]
})
export class AdminModule { }