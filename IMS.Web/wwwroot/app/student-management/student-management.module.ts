import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StudentManagementComponent } from './student-management.component';
import { StudentManagementRouting } from './student-management.routes';
import { StudentInformationManagementModule } from './student-management-information/student-management-information.module';
import { StudentManagementLookupModule } from './student-management-lookup/student-management-lookup.module';
import { StudentManagementInActiveModule } from './student-management-inactive/student-management-inactive.module';
import { StudentManagementNotificationModule } from './student-management-notification/student-management-notification.module';
import { StudentRelievingManagementModule } from './student-management-relieving/student-management-relieving.module';
import { StudentManagementDashboardModule } from './student-management-dashboard/student-management-dashboard.module';
import { StudentManagementArticlesModule } from './student-management-articles/student-management-articles.module';
import { StudentPromotionManagementModule } from './student-management-promotion/student-management-promotion.module';
import { StudentAttendanceManagementModule } from './student-management-attendance/student-management-attendance.module';
import { StudentFeeManagementModule } from './student-fee-management/student-fee-management.module';
import { StudentManagementMarkModule } from './student-management-mark/student-management-mark.module';
import { StudentManagementReportModule } from './student-management-report/student-management-report.module';
import { StudentLeaveManagementModule } from './student-management-leave/student-management-leave.module';

@NgModule({
  imports: [
    SharedModule,
    StudentManagementRouting,
    StudentManagementLookupModule,
    StudentInformationManagementModule,
    StudentManagementInActiveModule,
    StudentManagementNotificationModule,
    StudentRelievingManagementModule,
    StudentManagementDashboardModule,
    StudentManagementArticlesModule,
    StudentPromotionManagementModule,
    StudentAttendanceManagementModule,
    StudentFeeManagementModule,
    StudentManagementMarkModule,
    StudentManagementReportModule,
    StudentLeaveManagementModule
  ],
  declarations: [
    StudentManagementComponent
  ],
  providers: [
  ],
})
export class StudentManagementModule { }
