import { Component, OnInit } from '@angular/core';
import * as StaffManagementReport from '../staff-management-report.model';

@Component({
  moduleId: module.id,
  templateUrl: 'staff-management-report-list.html'
})
export class StaffManagementReportListComponent implements OnInit {
  reports: StaffManagementReport.ReportAc[] = StaffManagementReport.getStaffList();
  charts: StaffManagementReport.ReportAc[] = StaffManagementReport.getStaffChartList();
  constructor() {
  }

  ngOnInit() {
  }
}
