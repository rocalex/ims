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
let AddStudentFeeManagementRefundComponent = class AddStudentFeeManagementRefundComponent {
    constructor(studentFeeManagementRefundService, loaderService, router, snackBar) {
        this.studentFeeManagementRefundService = studentFeeManagementRefundService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.addStudent = new student_fee_management_refund_model_1.AddFeeRefundManagementAc();
        this.refundNumberEditable = false;
        this.initialData = {};
        this.students = [];
        this.error = new student_fee_management_refund_model_1.FeeRefundManagementResponse();
        this.currentDate = new Date();
    }
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
            }
            else {
                this.refundNumberEditable = true;
            }
            this.loaderService.toggleLoader(false);
        });
    }
    getStudentByClassAndSectionId() {
        this.loaderService.toggleLoader(true);
        this.studentFeeManagementRefundService.getStudentByClassAndSectionId(this.currentSelectedClass.id, this.currentSelectedSection.id).then(res => {
            this.students = res.json();
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
    addFeeRefund() {
        this.loaderService.toggleLoader(true);
        this.addStudent.ChequeDate = this.convertDateToUtc(this.addStudent.ChequeDate);
        this.addStudent.RefundDate = this.convertDateToUtc(this.addStudent.RefundDate);
        this.studentFeeManagementRefundService.addFeeRefund(this.addStudent).then(res => {
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
    getMinimumDateForRefund() {
        if (this.addStudent.StudentId) {
            var student = this.students.find(x => x.id === this.addStudent.StudentId);
            return student.admissionDate;
        }
        else {
            return this.currentDate;
        }
    }
};
AddStudentFeeManagementRefundComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-fee-management-refund-add.html'
    }),
    __metadata("design:paramtypes", [student_fee_management_refund_service_1.StudentFeeManagementRefundService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService])
], AddStudentFeeManagementRefundComponent);
exports.AddStudentFeeManagementRefundComponent = AddStudentFeeManagementRefundComponent;
//# sourceMappingURL=student-fee-management-refund-add.component.js.map