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
let EditAndDetailStudentFeeManagementFeeReceiptComponent = class EditAndDetailStudentFeeManagementFeeReceiptComponent {
    constructor(studentFeeManagementFeeReceiptService, loaderService, router, snackBar, activeRoute) {
        this.studentFeeManagementFeeReceiptService = studentFeeManagementFeeReceiptService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.activeRoute = activeRoute;
        this.feeReceipt = {};
        this.receiptTypes = ['Cash', 'Cheque'];
    }
    ngOnInit() {
        this.activeRoute.params.subscribe(res => this.feeReceiptId = res.id);
        this.getFeeReceiptsById();
    }
    getFeeReceiptsById() {
        this.loaderService.toggleLoader(true);
        this.studentFeeManagementFeeReceiptService.getFeeReceiptsById(this.feeReceiptId).then(res => {
            this.feeReceipt = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    updateFeeReceipt() {
        this.loaderService.toggleLoader(true);
        this.studentFeeManagementFeeReceiptService.updateFeeReceipt(this.feeReceipt).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['student', 'feemanagement', 'feereceipt', 'list']);
                this.snackBar.showSnackbar(response.message);
            }
            this.loaderService.toggleLoader(false);
        });
    }
    calculation() {
        this.feeReceipt.total = this.feeReceipt.amount + this.feeReceipt.lateFee - this.feeReceipt.previousAmountPaid;
    }
    changeOnCheque(reciept) {
        if (reciept.receiptTypeDescription === 'Cash') {
            reciept.chequeDate = undefined;
            reciept.chequeNumber = undefined;
        }
    }
};
EditAndDetailStudentFeeManagementFeeReceiptComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-fee-management-feereceipt-edit-detail.html'
    }),
    __metadata("design:paramtypes", [student_fee_management_feereceipt_service_1.StudentFeeManagementFeeReceiptService,
        loader_service_1.LoaderService, router_1.Router, snackbar_service_1.SnackbarService,
        router_1.ActivatedRoute])
], EditAndDetailStudentFeeManagementFeeReceiptComponent);
exports.EditAndDetailStudentFeeManagementFeeReceiptComponent = EditAndDetailStudentFeeManagementFeeReceiptComponent;
//# sourceMappingURL=student-fee-management-feereceipt-edit-detail.component.js.map