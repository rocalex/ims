import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { StaffManagementDashboardRouting } from './staff-management-dashboard.routes';
import { StaffManagementDashboardComponent } from './staff-management-dashboard.component';
import { StaffManagementDashboardService } from './staff-management-dashboard.service';

@NgModule({
    imports: [
        SharedModule,
        StaffManagementDashboardRouting
    ],
    declarations: [
        StaffManagementDashboardComponent
    ],
    providers: [
        StaffManagementDashboardService
    ],
})
export class StaffManagementDashboardModule { }
