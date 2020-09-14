import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { HostelManagementDashboardRouting } from './hostel-management-dashboard.route';
import { HostelManagementDashboardComponent } from './hostel-management-dashboard.component';
import { HostelManagementDashboardService } from './hostel-management-dashboard.service';

@NgModule({
    imports: [
        SharedModule,
        HostelManagementDashboardRouting
    ],
    declarations: [
        HostelManagementDashboardComponent
    ],
    providers: [
        HostelManagementDashboardService
    ],
})
export class HostelManagementDashboardModule { }
