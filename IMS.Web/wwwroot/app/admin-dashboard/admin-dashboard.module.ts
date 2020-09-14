import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { AdminDashboardManagementRouting } from './admin-dashboard.routes';
import { AdminDashboardComponent } from './admin-dashboard.component';

@NgModule({
    imports: [
        SharedModule,
        AdminDashboardManagementRouting
    ],
    declarations: [
        AdminDashboardComponent
    ],
    providers: [ ],
})
export class AdminDashboardModule { }
