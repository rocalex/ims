"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const student_fee_management_refund_service_1 = require("../student-fee-management-refund.service");
const loader_service_1 = require("../../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const student_fee_management_refund_model_1 = require("../student-fee-management-refund.model");
let EditAndDetailStudentFeeManagementRefundComponent = class EditAndDetailStudentFeeManagementRefundComponent {
    constructor(studentFeeManagementRefundService, loaderService, router, snackBar, activeRoute) {
        this.studentFeeManagementRefundService = studentFeeManagementRefundService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.activeRoute = activeRoute;
        this.initialData = {};
        this.addStudent = new student_fee_management_refund_model_1.UpdateFeeRefundManagementAc();
        this.error = new student_fee_management_refund_model_1.FeeRefundManagementResponse();
        this.currentDate = new Date();
    }
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
            }
            else {
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
    checkWhiteSpace(nameModel, name) {
        if (name) {
            if (name.trim() === '') {
                nameModel.whiteSpaceError = true;
            }
            else {
                nameModel.whiteSpaceError = false;
            }
        }
    }
    hasError(fieldName) {
        var id = student_fee_management_refund_model_1.FeeRefundManagementErrorType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        }
        else {
            return false;
        }
    }
    resetError(fieldName) {
        var id = student_fee_management_refund_model_1.FeeRefundManagementErrorType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new student_fee_management_refund_model_1.FeeRefundManagementResponse();
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
            }
            else {
                this.error = new student_fee_management_refund_model_1.FeeRefundManagementResponse();
                this.error.ErrorType = response.errorType;
                this.error.HasError = response.hasError;
                this.error.Message = response.message;
            }
            this.loaderService.toggleLoader(false);
        });
    }
    convertDateToUtc(dateString) {
        var date = new Date(dateString);
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    }
};
EditAndDetailStudentFeeManagementRefundComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-fee-management-refund-edit-detail.html'
    }),
    __metadata("design:paramtypes", [student_fee_management_refund_service_1.StudentFeeManagementRefundService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService, router_1.ActivatedRoute])
], EditAndDetailStudentFeeManagementRefundComponent);
exports.EditAndDetailStudentFeeManagementRefundComponent = EditAndDetailStudentFeeManagementRefundComponent;
//# sourceMappingURL=student-fee-management-refund-edit-detail.component.js.map