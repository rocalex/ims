import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { StudentManagementDashboardRouting } from './student-management-dashboard.routes';
import { StudentManagementDashboardComponent } from './student-management-dashboard.component';
import { StudentManagementDashboardService } from './student-management-dashboard.service';

@NgModule({
    imports: [
        SharedModule,
        StudentManagementDashboardRouting
    ],
    declarations: [
        StudentManagementDashboardComponent
    ],
    providers: [
        StudentManagementDashboardService
    ],
})
export class StudentManagementDashboardModule { }
