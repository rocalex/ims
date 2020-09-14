import { Component, OnInit } from '@angular/core';
import * as StudentManagementReport from '../student-fee-management-report.model';
import { StudentFeeManagementReportService } from '../student-fee-management-report.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-fee-management-report-view.html'
})
export class StudentFeeManagementReportViewComponent implements OnInit {
  reports: StudentManagementReport.ReportAc[] = StudentManagementReport.getStudentList();
  selectedOrder: number;
  initialData: any = {};
  academicYearFilterId: number;
  students: any[] = [];
  paymentsGrid: any[] = [];
  classFilterId: number;
  sectionFilterId: number;
  religionFilterId: number;
  genderFilterId: number;
  studentFilterId: number;
  constructor(private studentManagementReportService: StudentFeeManagementReportService, private loaderService: LoaderService,
    private router: Router, private activeRoute: ActivatedRoute, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(res => this.selectedOrder = +res.id);
    this.getInitialDataForReports();
  }

  getInitialDataForReports() {
    this.loaderService.toggleLoader(true);
    this.studentManagementReportService.getInitialDataForReports().then(res => {
      this.initialData = res.json();
      this.students = this.initialData.students;
      if (this.initialData.academicYears.length) {
        var data = this.initialData.academicYears.find(x => x.isActive === true);
        if (data) {
          this.academicYearFilterId = data.id;
        }
      }
      this.filterData();
      this.loaderService.toggleLoader(false);
    });
  }

  filterData() {
    var list = JSON.parse(JSON.stringify(this.students));
    if (this.classFilterId) {
      list = list.filter(x => x.currentClassId === this.classFilterId);
    }
    if (this.sectionFilterId) {
      list = list.filter(x => x.sectionId === this.sectionFilterId);
    }
    this.paymentsGrid = [];
    switch (this.selectedOrder) {
      case 1: {
        var students = JSON.parse(JSON.stringify(this.students));
        if (this.studentFilterId) {
          students = students.filter(x => x.id === this.studentFilterId);
        }
        for (var i = 0; i < students.length; i++) {
          var studentData = students[i];
          var payments = this.initialData.feeReciepts.filter(x => x.studentId === studentData.id);
          this.paymentsGrid.push({ name: studentData.firstName + ' ' + studentData.lastName, payments: payments });
        }
      } break;
      case 2: {
        var classes = JSON.parse(JSON.stringify(this.initialData.classes));
        if (this.classFilterId) {
          classes = classes.filter(x => x.id === this.classFilterId);
        }
        for (var i = 0; i < classes.length; i++) {
          var classData = classes[i];
          var payments = this.initialData.feeReciepts.filter(x => x.classId === classData.id);
          this.paymentsGrid.push({ name: classData.name, payments: payments });
        }
      } break;
      case 4: {
        var classes = JSON.parse(JSON.stringify(this.initialData.classes));
        if (this.classFilterId) {
          classes = classes.filter(x => x.id === this.classFilterId);
        }
        for (var i = 0; i < classes.length; i++) {
          var classData = classes[i];
          var studentsData = this.students.filter(x => x.currentClassId === classData.id);
          var studentIds = studentsData.map(x => x.id);
          studentIds = this.distinct(studentIds);
          var paymentsData: any[] = [];
          for (var j = 0; j < studentIds.length; j++) {
            var studentPay = this.initialData.refunds.filter(x => x.studentId === studentIds[j]);
            for (var k = 0; k < studentPay.length; k++) {
              paymentsData.push(studentPay[k]);
            }
          }
          this.paymentsGrid.push({ name: classData.name, payments: paymentsData });
        }
      } break;
      case 6: {
        var religions = JSON.parse(JSON.stringify(this.initialData.religions));
        if (this.religionFilterId) {
          religions = religions.filter(x => x.id === this.religionFilterId);
        }
        for (var i = 0; i < religions.length; i++) {
          var religionData = religions[i];
          var studentsData = this.students.filter(x => x.religionId === religionData.id);
          var studentIds = studentsData.map(x => x.id);
          studentIds = this.distinct(studentIds);
          var paymentsData: any[] = [];
          for (var j = 0; j < studentIds.length; j++) {
            var studentPay = this.initialData.feeReciepts.filter(x => x.studentId === studentIds[j]);
            for (var k = 0; k < studentPay.length; k++) {
              paymentsData.push(studentPay[k]);
            }
          }
          this.paymentsGrid.push({ name: religionData.name, payments: paymentsData });
        }
      } break;
      default: {
        this.snackBar.showSnackbar('Report is under construction');
        this.router.navigate(['student', 'feemanagement', 'report', 'list']);
      } break;
    }
  }

  reset(filter) {
    if (filter === 'Class') {
      this.classFilterId = undefined;
    } else if (filter === 'Section') {
      this.sectionFilterId = undefined;
    } else if (filter === 'Religion') {
      this.religionFilterId = undefined;
    } else if (filter === 'Gender') {
      this.genderFilterId = undefined;
    }
    this.filterData();
  }

  distinct(arr: any[]) {
    var unique = arr.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })
    return unique;
  }
}
