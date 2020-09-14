import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { StaffManagementRouting } from './staff-management.routes';

import { StaffManagementComponent } from './staff-management.component';
import { StaffDepartmentManagementModule } from './staff-management-department/staff-management-department.module';
import { StaffDesignationManagementModule } from './staff-management-designation/staff-management-designation.module';
import { StaffManagementInformationModule } from './staff-management-information/staff-management-information.module';
import { StaffPlannerManagementModule } from './staff-management-planner/staff-management-planner.module';
import { StaffManagementDashboardModule } from './staff-management-dashboard/staff-management-dashboard.module';
import { StaffManagementReportModule } from './staff-management-report/staff-management-report.module';
import { StaffManagementActivitiesModule } from './staff-management-activities/staff-management-activities.module';
import { StaffLeaveManagementModule } from './staff-management-leave/staff-management-leave.module';
import { StaffAttendanceManagementModule } from './staff-management-attendance/staff-management-attendance.module';

@NgModule({
  imports: [
    SharedModule,
    StaffManagementRouting,
    StaffDepartmentManagementModule,
    StaffDesignationManagementModule,
    StaffManagementInformationModule,
    StaffPlannerManagementModule,
    StaffManagementDashboardModule,
    StaffManagementReportModule,
    StaffManagementActivitiesModule,
    StaffLeaveManagementModule,
    StaffAttendanceManagementModule
  ],
  declarations: [
    StaffManagementComponent
  ],
  providers: [
  ],
})
export class StaffManagementModule { }
