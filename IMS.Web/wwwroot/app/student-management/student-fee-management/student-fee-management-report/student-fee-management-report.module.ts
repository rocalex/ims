import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentFeeManagementReportService } from './student-fee-management-report.service';
import { StudentManagementReportComponent } from './student-fee-management-report.component';
import { StudentFeeManagementReportViewComponent } from './student-fee-management-report-view/student-fee-management-report-view.component';
import { StudentFeeManagementReportListComponent } from './student-fee-management-report-list/student-fee-management-report-list.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    StudentManagementReportComponent,
    StudentFeeManagementReportListComponent,
    StudentFeeManagementReportViewComponent
  ],
  providers: [
    StudentFeeManagementReportService
  ],
})
export class StudentFeeManagementReportModule { }
