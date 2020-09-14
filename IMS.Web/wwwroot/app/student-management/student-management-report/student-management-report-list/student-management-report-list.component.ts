import { Component, OnInit } from '@angular/core';
import * as StudentManagementReport from '../student-management-report.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-report-list.html'
})
export class StudentManagementReportListComponent implements OnInit {
  reports: StudentManagementReport.ReportAc[] = StudentManagementReport.getStudentList();
  charts: StudentManagementReport.ReportAc[] = StudentManagementReport.getStudentChartList();
  constructor() {
  }

  ngOnInit() {
  }
}
