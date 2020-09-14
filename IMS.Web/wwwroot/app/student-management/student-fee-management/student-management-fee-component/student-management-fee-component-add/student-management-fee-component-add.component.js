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
const router_1 = require("@angular/router");
const loader_service_1 = require("../../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const student_management_fee_component_service_1 = require("../student-management-fee-component.service");
const student_fee_management_model_1 = require("../../student-fee-management.model");
let AddFeeComponentManagementComponent = class AddFeeComponentManagementComponent {
    constructor(loaderService, snackbarService, feeComponentManagementService, router) {
        this.loaderService = loaderService;
        this.snackbarService = snackbarService;
        this.feeComponentManagementService = feeComponentManagementService;
        this.router = router;
        this.feeComponent = new student_fee_management_model_1.FeeComponent();
        this.errorMessage = '';
        this.duplicatePriorityMessage = '';
        this.whiteSpaceError = '';
        this.feeComponentTypeEnumDetails = [
            { key: student_fee_management_model_1.FeeComponentTypeEnum.ApplicableToAll, value: 'Applicable To All' },
            { key: student_fee_management_model_1.FeeComponentTypeEnum.Deduction, value: 'Deduction' },
            { key: student_fee_management_model_1.FeeComponentTypeEnum.Individual, value: 'Individual' },
            { key: student_fee_management_model_1.FeeComponentTypeEnum.SpecialFee, value: 'Special Fee' }
        ];
        this.feeComponentPriorityList = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    }
    ngOnInit() {
        this.feeComponent.priority = 0;
    }
    checkWhiteSpace() {
        this.whiteSpaceError = '';
        if (this.feeComponent.name.trim() === '') {
            this.whiteSpaceError = 'Fee Component Name can\'t be null or empty';
        }
    }
    resetError() {
        this.whiteSpaceError = '';
        this.errorMessage = '';
        this.duplicatePriorityMessage = '';
    }
    addFeeComponent() {
        this.loaderService.toggleLoader(true);
        this.feeComponentManagementService.addFeeComponent(this.feeComponent)
            .then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                if (response.message !== null && response.message !== undefined) {
                    this.errorMessage = response.message;
                }
                if (response.duplicatePriorityMessage !== null && response.duplicatePriorityMessage !== undefined) {
                    this.duplicatePriorityMessage = response.duplicatePriorityMessage;
                }
            }
            else {
                this.snackbarService.showSnackbar(response.message);
                this.router.navigate(['student', 'feemanagement', 'component', 'list']);
            }
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
};
AddFeeComponentManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-fee-component-add.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        student_management_fee_component_service_1.FeeComponentManagementService,
        router_1.Router])
], AddFeeComponentManagementComponent);
exports.AddFeeComponentManagementComponent = AddFeeComponentManagementComponent;
//# sourceMappingURL=student-management-fee-component-add.component.js.map