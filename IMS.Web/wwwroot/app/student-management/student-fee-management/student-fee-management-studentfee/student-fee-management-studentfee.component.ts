import { Component, OnInit } from '@angular/core';
import { StudentFeeManagementStudentFeeService } from './student-fee-management-studentfee.service';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-fee-management-studentfee.html'
})
export class StudentFeeManagementStudentFeeComponent implements OnInit {
  initialData: any = {};
  currentSelectedClass: any;
  currentSelectedSection: any;
  students: any[] = [];
  studentFee: any = {};
  studentId: number;
  individualPreviewTable: any[] = [];
  discountPreviewTable: any[] = [];
  previewColumns: number[] = [];
  constructor(private studentFeeManagementStudentFeeService: StudentFeeManagementStudentFeeService,
    private loaderService: LoaderService, private snackBar: SnackbarService) { }

  ngOnInit() {
    this.studentFee = {};
    this.students = [];
    this.studentId = 0;
    this.individualPreviewTable = [];
    this.discountPreviewTable = [];
    this.getInitialData();
    this.currentSelectedClass = {};
    this.currentSelectedSection = {};
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.studentFeeManagementStudentFeeService.getInitialData().then(res => {
      this.initialData = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  getStudentByClassAndSectionId() {
    this.loaderService.toggleLoader(true);
    this.studentFeeManagementStudentFeeService.getStudentByClassAndSectionId(this.currentSelectedClass.id,
      this.currentSelectedSection.id).then(res => {
        this.students = res.json();
        this.loaderService.toggleLoader(false);
      });
  }

  getStudentFee(studentId: number) {
    this.loaderService.toggleLoader(true);
    this.studentFeeManagementStudentFeeService.getStudentFee(studentId).then(res => {
      var response = res.json();
      if (response.hasError) {
        this.snackBar.showSnackbar(response.message);
      } else {
        this.studentFee = response.data.studentFee;
        this.individualPreviewTable = [];
        this.discountPreviewTable = [];
        for (var i = 0; i < response.data.discount.length; i++) {
          var components = this.studentFee.studentFeeComponents.filter(x => x.individualOrDiscountFeeComponentId === response.data.discount[i].id);
          var data = { Name: response.data.discount[i].name, list: [] };
          for (var j = 1; j <= this.studentFee.class.numberOfFeeTerms; j++) {
            data.list.push(components.find(x => x.termOrderId === j));
          }
          this.discountPreviewTable.push(data);
        }
        for (var i = 0; i < response.data.individual.length; i++) {
          var components = this.studentFee.studentFeeComponents.filter(x => x.individualOrDiscountFeeComponentId === response.data.individual[i].id);
          var data = { Name: response.data.individual[i].name, list: [] };
          for (var j = 1; j <= this.studentFee.class.numberOfFeeTerms; j++) {
            data.list.push(components.find(x => x.termOrderId === j));
          }
          this.individualPreviewTable.push(data);
        }
        this.previewColumns = [];
        for (var j = 1; j <= this.studentFee.class.numberOfFeeTerms; j++) {
          this.previewColumns.push(j);
        }
      }
      this.loaderService.toggleLoader(false);
    });
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  updateStudentFee() {
    this.loaderService.toggleLoader(true);
    var list: any[] = [];
    var individual = this.individualPreviewTable.map(x => x.list);
    for (var i = 0; i < individual.length; i++) {
      for (var j = 0; j < individual[i].length; j++) {
        list.push(individual[i][j]);
      }
    }
    var discount = this.discountPreviewTable.map(x => x.list);
    for (var i = 0; i < discount.length; i++) {
      for (var j = 0; j < discount[i].length; j++) {
        list.push(discount[i][j]);
      }
    }
    this.studentFeeManagementStudentFeeService.updateStudentFee(list, this.studentFee.id).then(res => {
      var response = res.json();
      if (response.hasError) {
        this.snackBar.showSnackbar(response.message);
      } else {
        this.ngOnInit();
      }
      this.loaderService.toggleLoader(false);
    });
  }
}
