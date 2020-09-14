import { Component, OnInit } from '@angular/core';
import * as StudentManagementReport from '../student-fee-management-report.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-fee-management-report-list.html'
})
export class StudentFeeManagementReportListComponent implements OnInit {
  reports: StudentManagementReport.ReportAc[] = StudentManagementReport.getStudentList();
  constructor() {
  }

  ngOnInit() {
  }
}
