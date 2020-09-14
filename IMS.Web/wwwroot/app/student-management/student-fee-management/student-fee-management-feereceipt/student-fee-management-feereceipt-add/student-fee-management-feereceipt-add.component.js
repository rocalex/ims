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
const student_fee_management_feereceipt_service_1 = require("../student-fee-management-feereceipt.service");
const loader_service_1 = require("../../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const student_fee_management_feereceipt_model_1 = require("../student-fee-management-feereceipt.model");
let AddStudentFeeManagementFeeReceiptComponent = class AddStudentFeeManagementFeeReceiptComponent {
    constructor(studentFeeManagementFeeReceiptService, loaderService, router, snackBar) {
        this.studentFeeManagementFeeReceiptService = studentFeeManagementFeeReceiptService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.initialData = {};
        this.selectedReligionId = 'all';
        this.students = [];
        this.religions = [{ name: 'All', id: 'all' }];
        this.receipts = [];
        this.receiptTypes = ['Cash', 'Cheque'];
        this.feeComponent = {};
        this.studentFeeComponent = [];
        this.terms = ['All'];
        this.selectedTerm = 'All';
        this.receiptNumberEditable = false;
        this.error = new student_fee_management_feereceipt_model_1.FeeReceiptManagementResponse();
        this.allSelected = false;
        this.indeterminate = false;
        this.modeOfSelection = ['All', 'Individual'];
        this.selectedMode = 'All';
        this.singleStudent = {};
    }
    ngOnInit() {
        this.getInitialData();
    }
    getInitialData() {
        this.loaderService.toggleLoader(true);
        this.studentFeeManagementFeeReceiptService.getInitialData().then(res => {
            this.initialData = res.json();
            for (var i = 0; i < this.initialData.religions.length; i++) {
                this.religions.push({ name: this.initialData.religions[i].name, id: this.initialData.religions[i].id });
            }
            this.loaderService.toggleLoader(false);
        });
    }
    getStudentByClassReligionAndSectionId() {
        this.loaderService.toggleLoader(true);
        var religion = (this.selectedReligionId === 'all') ? null : this.selectedReligionId;
        this.studentFeeManagementFeeReceiptService.getStudentByClassReligionAndSectionId(this.selectedClass.id, this.selectedSection.id, religion).then(res => {
            this.students = res.json();
            if (this.selectedMode === 'All') {
                this.getFeeComponent();
            }
            this.loaderService.toggleLoader(false);
        });
    }
    addDataInReceipt() {
        this.receipts = [];
        if (this.selectedMode === 'All') {
            for (var i = 0; i < this.students.length; i++) {
                var receipt = new student_fee_management_feereceipt_model_1.FeeReceiptAc();
                receipt.StudentId = this.students[i].id;
                receipt.ReceiptDate = new Date();
                receipt.ClassId = this.selectedClass.id;
                receipt.ReceiptType = this.receiptTypes[0];
                receipt.StudentDetail = this.students[i].rollNumber + ' - ' + this.students[i].firstName + ' ' + this.students[i].lastName;
                this.receipts.push(receipt);
            }
        }
        else {
            var receipt = new student_fee_management_feereceipt_model_1.FeeReceiptAc();
            receipt.StudentId = this.singleStudent.id;
            receipt.ReceiptDate = new Date();
            receipt.ClassId = this.selectedClass.id;
            receipt.ReceiptType = this.receiptTypes[0];
            receipt.StudentDetail = this.singleStudent.rollNumber + ' - ' + this.singleStudent.firstName + ' ' + this.singleStudent.lastName;
            this.receipts.push(receipt);
        }
    }
    getFeeComponent() {
        this.loaderService.toggleLoader(true);
        var religion = (this.selectedReligionId === 'all') ? null : this.selectedReligionId;
        this.studentFeeManagementFeeReceiptService.getFeeComponent(this.selectedClass.id, religion).then(res => {
            var response = res.json();
            if (response.message) {
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.addDataInReceipt();
                this.feeComponent = response;
                for (var a = 0; a < this.receipts.length; a++) {
                    this.receipts[a].FeeReceiptComponents = [];
                }
                this.terms = ['All'];
                for (var i = 1; i <= this.feeComponent.terms; i++) {
                    this.terms.push(i);
                }
                for (var i = 0; i < this.feeComponent.feeComponents.length; i++) {
                    var feeComponent = this.feeComponent.feeComponents[i];
                    var component = { name: feeComponent.name, amount: 0, id: feeComponent.id };
                    var courseFees = [];
                    if (this.selectedTerm === 'All') {
                        courseFees = this.feeComponent.courseFeeTermComponents.filter(x => x.feeComponentId === feeComponent.id);
                    }
                    else {
                        courseFees = this.feeComponent.courseFeeTermComponents.filter(x => x.feeComponentId === feeComponent.id
                            && x.term === this.selectedTerm);
                    }
                    for (var j = 0; j < courseFees.length; j++) {
                        component.amount += courseFees[j].amount;
                    }
                    for (var k = 0; k < this.receipts.length; k++) {
                        var com = new student_fee_management_feereceipt_model_1.FeeReceiptComponentAc();
                        com.Name = component.name;
                        com.Amount = component.amount;
                        com.Id = component.id;
                        this.receipts[k].FeeReceiptComponents.push(com);
                    }
                }
                this.getStudentFees();
            }
            this.loaderService.toggleLoader(false);
        });
    }
    getStudentFees() {
        this.loaderService.toggleLoader(true);
        var studentIds = this.students.map(x => x.id);
        this.studentFeeManagementFeeReceiptService.getStudentFees(studentIds).then(res => {
            this.studentFeeComponent = res.json();
            for (var k = 0; k < this.feeComponent.feeComponents.length; k++) {
                var feeComponent = this.feeComponent.feeComponents[k];
                if (feeComponent.feeComponentType === 1 || feeComponent.feeComponentType === 2) {
                    var component = { name: feeComponent.name, amount: 0, id: feeComponent.id };
                    for (var i = 0; i < this.studentFeeComponent.length; i++) {
                        var studentFee = this.studentFeeComponent[i];
                        var studentIndex = this.receipts.findIndex(x => x.StudentId === this.studentFeeComponent[i].studentId);
                        if (studentIndex !== -1) {
                            var components = [];
                            if (this.selectedTerm === 'All') {
                                components = studentFee.studentFeeComponents.filter(x => x.individualOrDiscountFeeComponentId === feeComponent.id);
                            }
                            else {
                                components = studentFee.studentFeeComponents.filter(x => x.individualOrDiscountFeeComponentId === feeComponent.id
                                    && x.termOrderId === this.selectedTerm);
                            }
                            for (var a = 0; a < components.length; a++) {
                                component.amount += components[a].amount;
                            }
                            var comIndex = this.receipts[studentIndex].FeeReceiptComponents.findIndex(x => x.Id === component.id);
                            this.receipts[studentIndex].FeeReceiptComponents[comIndex].Amount = component.amount;
                        }
                    }
                }
            }
            for (var i = 0; i < this.receipts.length; i++) {
                var feeComponents = this.receipts[i].FeeReceiptComponents;
                for (var j = 0; j < feeComponents.length; j++) {
                    var com = feeComponents[j];
                    this.receipts[i].Amount += com.Amount;
                }
            }
            this.getAutoSequenceNumberByTypeAndInstituteId();
            this.calculation();
            this.loaderService.toggleLoader(false);
        });
    }
    addFeeReceipt() {
        var list = [];
        if (this.selectedMode === 'All') {
            list = this.receipts.filter(x => x.IsSelected === true);
        }
        else {
            list = this.receipts;
        }
        if (list.length) {
            for (var i = 0; i < list.length; i++) {
                list[i].Term = (this.selectedTerm === 'All') ? 0 : +this.selectedTerm;
            }
            this.loaderService.toggleLoader(true);
            this.studentFeeManagementFeeReceiptService.addFeeReceipt(list).then(res => {
                var response = res.json();
                if (!response.hasError) {
                    this.router.navigate(['student', 'feemanagement', 'feereceipt', 'list']);
                    this.snackBar.showSnackbar(response.message);
                }
                else {
                    this.error = new student_fee_management_feereceipt_model_1.FeeReceiptManagementResponse();
                    this.error.ErrorType = response.errorType;
                    this.error.HasError = response.hasError;
                    this.error.Message = response.message;
                    this.error.OrderId = response.orderId;
                }
                this.loaderService.toggleLoader(false);
            });
        }
    }
    isAllowedToSaveReceipt() {
        var isAnyReceiptEmpty = this.receipts.filter(x => x.ReceiptNumber.trim() === '' || x.ReceiptNumber === undefined
            || x.ReceiptNumber === null);
        return (isAnyReceiptEmpty.length === 0);
    }
    isAllowedToSaveChallan() {
        var isAnyChallanEmpty = this.receipts.filter(x => x.ChallanNumber.trim() === '' || x.ChallanNumber === undefined
            || x.ChallanNumber === null);
        return (isAnyChallanEmpty.length === 0);
    }
    hasError(fieldName, index) {
        var id = student_fee_management_feereceipt_model_1.FeeReceiptManagementResponseType[fieldName];
        if (this.error.ErrorType === id && this.error.OrderId === index) {
            return this.error.HasError;
        }
        else {
            return false;
        }
    }
    reset() {
        this.students = [];
        this.receipts = [];
    }
    getAutoSequenceNumberByTypeAndInstituteId() {
        this.loaderService.toggleLoader(true);
        var length = (this.selectedMode === 'All') ? this.students.length : 1;
        this.studentFeeManagementFeeReceiptService.getAutoSequenceNumberByTypeAndInstituteId(length).then(res => {
            var response = res.json();
            this.receiptNumberEditable = (response.length === 0);
            for (var i = 0; i < response.length; i++) {
                this.receipts[i].ReceiptNumber = response[i];
            }
            this.loaderService.toggleLoader(false);
        });
    }
    calculation() {
        for (var i = 0; i < this.receipts.length; i++) {
            var rec = this.receipts[i];
            rec.Total = rec.Amount + rec.LateFee - rec.PreviousAmountPaid;
        }
    }
    checkboxChange() {
        var selected = this.receipts.filter(x => x.IsSelected === true);
        if (selected.length) {
            this.indeterminate = (selected.length !== this.receipts.length);
            this.allSelected = !this.indeterminate;
        }
        else {
            this.indeterminate = false;
            this.allSelected = false;
        }
    }
    selectAll() {
        this.indeterminate = false;
        for (var i = 0; i < this.receipts.length; i++) {
            this.receipts[i].IsSelected = this.allSelected;
        }
    }
    changeOnCheque(reciept) {
        if (reciept.ReceiptType === 'Cash') {
            reciept.ChequeDate = undefined;
            reciept.ChequeNumber = undefined;
        }
    }
};
AddStudentFeeManagementFeeReceiptComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-fee-management-feereceipt-add.html'
    }),
    __metadata("design:paramtypes", [student_fee_management_feereceipt_service_1.StudentFeeManagementFeeReceiptService,
        loader_service_1.LoaderService, router_1.Router, snackbar_service_1.SnackbarService])
], AddStudentFeeManagementFeeReceiptComponent);
exports.AddStudentFeeManagementFeeReceiptComponent = AddStudentFeeManagementFeeReceiptComponent;
//# sourceMappingURL=student-fee-management-feereceipt-add.component.js.map