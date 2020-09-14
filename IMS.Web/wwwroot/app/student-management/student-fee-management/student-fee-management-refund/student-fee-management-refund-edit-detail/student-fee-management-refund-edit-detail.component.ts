import { Component, OnInit } from '@angular/core';
import { StudentFeeManagementRefundService } from '../student-fee-management-refund.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { UpdateFeeRefundManagementAc, FeeRefundManagementErrorType, FeeRefundManagementResponse } from '../student-fee-management-refund.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-fee-management-refund-edit-detail.html'
})
export class EditAndDetailStudentFeeManagementRefundComponent implements OnInit {
  initialData: any = {};
  addStudent: UpdateFeeRefundManagementAc = new UpdateFeeRefundManagementAc();
  error: FeeRefundManagementResponse = new FeeRefundManagementResponse();
  currentDate: Date = new Date();
  constructor(private studentFeeManagementRefundService: StudentFeeManagementRefundService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(res => this.addStudent.Id = res.id);
    this.getInitialData();
    this.getFeeRefundById();
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.studentFeeManagementRefundService.getInitialData().then(res => {
      this.initialData = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  getFeeRefundById() {
    this.loaderService.toggleLoader(true);
    this.studentFeeManagementRefundService.getFeeRefundById(this.addStudent.Id).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['student', 'feemanagement', 'refund', 'list']);
      } else {
        this.addStudent.Amount = response.amount;
        this.addStudent.BankName = response.bankName;
        this.addStudent.ChallanNumber = response.challanNumber;
        this.addStudent.ChequeDate = response.chequeDate;
        this.addStudent.ChequeNumber = response.chequeNumber;
        this.addStudent.IssuedById = response.issuedById;
        this.addStudent.RefundDate = response.refundDate;
        this.addStudent.RefundNumber = response.refundNumber;
        this.addStudent.Remark = response.remark;
        this.addStudent.Student = response.student.rollNumber + ' - ' + response.student.firstName + ' ' + response.student.lastName;
        this.addStudent.StudentDetail = response.student;
      }
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

  updateFeeRefund() {
    this.loaderService.toggleLoader(true);
    this.addStudent.ChequeDate = this.convertDateToUtc(this.addStudent.ChequeDate);
    this.addStudent.RefundDate = this.convertDateToUtc(this.addStudent.RefundDate);
    this.studentFeeManagementRefundService.updateFeeRefund(this.addStudent).then(res => {
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
}
