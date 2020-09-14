import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StaffManagementReportService } from './staff-management-report.service';
import { StaffManagementReportRouting } from './staff-management-report.routes';
import { StaffManagementReportComponent } from './staff-management-report.component';
import { StaffManagementReportViewComponent } from './staff-management-report-view/staff-management-report-view.component';
import { StaffManagementReportListComponent } from './staff-management-report-list/staff-management-report-list.component';
import { StaffManagementReportChartComponent } from './staff-management-report-chart/staff-management-report-chart.component';

@NgModule({
  imports: [
    SharedModule,
    StaffManagementReportRouting
  ],
  declarations: [
    StaffManagementReportComponent,
    StaffManagementReportListComponent,
    StaffManagementReportViewComponent,
    StaffManagementReportChartComponent
  ],
  providers: [
    StaffManagementReportService
  ],
})
export class StaffManagementReportModule { }
