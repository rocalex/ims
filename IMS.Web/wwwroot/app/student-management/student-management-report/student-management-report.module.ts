import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StudentManagementReportService } from './student-management-report.service';
import { StudentManagementReportRouting } from './student-management-report.routes';
import { StudentManagementReportComponent } from './student-management-report.component';
import { StudentManagementReportViewComponent } from './student-management-report-view/student-management-report-view.component';
import { StudentManagementReportListComponent } from './student-management-report-list/student-management-report-list.component';
import { StudentManagementReportChartComponent } from './student-management-report-chart/student-management-report-chart.component';

@NgModule({
  imports: [
    SharedModule,
    StudentManagementReportRouting
  ],
  declarations: [
    StudentManagementReportComponent,
    StudentManagementReportListComponent,
    StudentManagementReportViewComponent,
    StudentManagementReportChartComponent
  ],
  providers: [
    StudentManagementReportService
  ],
})
export class StudentManagementReportModule { }
