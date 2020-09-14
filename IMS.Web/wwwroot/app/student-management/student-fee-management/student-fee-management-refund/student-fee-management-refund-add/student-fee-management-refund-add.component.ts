import { Component, OnInit } from '@angular/core';
import { StudentFeeManagementRefundService } from '../student-fee-management-refund.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { AddFeeRefundManagementAc, FeeRefundManagementErrorType, FeeRefundManagementResponse } from '../student-fee-management-refund.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-fee-management-refund-add.html'
})
export class AddStudentFeeManagementRefundComponent implements OnInit {
  addStudent: AddFeeRefundManagementAc = new AddFeeRefundManagementAc();
  refundNumberEditable: boolean = false;
  initialData: any = {};
  currentSelectedClass: any;
  currentSelectedSection: any;
  students: any[] = [];
  error: FeeRefundManagementResponse = new FeeRefundManagementResponse();
  currentDate: Date = new Date();
  constructor(private studentFeeManagementRefundService: StudentFeeManagementRefundService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) { }

  ngOnInit() {
    this.getInitialData();
    this.getAutoSequenceNumberByTypeAndInstituteId();
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.studentFeeManagementRefundService.getInitialData().then(res => {
      this.initialData = res.json();
      this.addStudent.IssuedById = this.initialData.loggedInUser.id;
      this.loaderService.toggleLoader(false);
    });
  }

  getAutoSequenceNumberByTypeAndInstituteId() {
    this.loaderService.toggleLoader(true);
    this.studentFeeManagementRefundService.getAutoSequenceNumberByTypeAndInstituteId().then(res => {
      var response = res.json();
      if (response.hasValue) {
        this.addStudent.RefundNumber = response.data;
        this.refundNumberEditable = false;
      } else {
        this.refundNumberEditable = true;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  getStudentByClassAndSectionId() {
    this.loaderService.toggleLoader(true);
    this.studentFeeManagementRefundService.getStudentByClassAndSectionId(this.currentSelectedClass.id,
      this.currentSelectedSection.id).then(res => {
        this.students = res.json();
        this.loaderService.toggleLoader(false);
      });
  }

  checkWhiteSpace(nameModel: any, name: string) {
    if (name) {
      if (name.trim() === '') {
        nameModel.whiteSpaceError = true;
      } else {
        nameModel.whiteSpaceError = false;
      }
    }
  }

  hasError(fieldName: string) {
    var id = FeeRefundManagementErrorType[fieldName];
    if (this.error.ErrorType === id) {
      return this.error.HasError;
    } else {
      return false;
    }
  }

  resetError(fieldName: string) {
    var id = FeeRefundManagementErrorType[fieldName];
    if (this.error.ErrorType === id) {
      this.error = new FeeRefundManagementResponse();
    }
  }

  addFeeRefund() {
    this.loaderService.toggleLoader(true);
    this.addStudent.ChequeDate = this.convertDateToUtc(this.addStudent.ChequeDate);
    this.addStudent.RefundDate = this.convertDateToUtc(this.addStudent.RefundDate);
    this.studentFeeManagementRefundService.addFeeRefund(this.addStudent).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'feemanagement', 'refund', 'list']);
        this.snackBar.showSnackbar(response.message);
      } else {
        this.error = new FeeRefundManagementResponse();
        this.error.ErrorType = response.errorType;
        this.error.HasError = response.hasError;
        this.error.Message = response.message;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  convertDateToUtc(dateString: any) {
    var date = new Date(dateString);
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  }

  getMinimumDateForRefund() {
    if (this.addStudent.StudentId) {
      var student = this.students.find(x => x.id === this.addStudent.StudentId);
      return student.admissionDate;
    } else {
      return this.currentDate;
    }
  }
}
