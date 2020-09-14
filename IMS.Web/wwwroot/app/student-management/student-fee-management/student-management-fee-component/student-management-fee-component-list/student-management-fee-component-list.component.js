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
const loader_service_1 = require("../../../../../shared/loader-service");
const student_management_fee_component_service_1 = require("../student-management-fee-component.service");
const student_fee_management_model_1 = require("../../student-fee-management.model");
const sidenav_model_1 = require("../../../../../shared/sidenav/sidenav.model");
const permission_service_1 = require("../../../../../shared/permission.service");
let ListFeeComponentManagementComponent = class ListFeeComponentManagementComponent {
    constructor(loaderService, permissionService, feeComponentManagementService) {
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.feeComponentManagementService = feeComponentManagementService;
        this.feeComponentsList = [];
        this.feeComponentTypeEnumDetails = [
            { key: student_fee_management_model_1.FeeComponentTypeEnum.ApplicableToAll, value: 'Applicable To All' },
            { key: student_fee_management_model_1.FeeComponentTypeEnum.Deduction, value: 'Deduction' },
            { key: student_fee_management_model_1.FeeComponentTypeEnum.Individual, value: 'Individual' },
            { key: student_fee_management_model_1.FeeComponentTypeEnum.SpecialFee, value: 'Special Fee' }
        ];
    }
    ngOnInit() {
        this.getAllFeeComponentsList();
    }
    getAllFeeComponentsList() {
        this.loaderService.toggleLoader(true);
        this.feeComponentManagementService.getAllFeeComponents()
            .then(res => {
            this.feeComponentsList = res.json();
            this.feeComponentsList.forEach(feeComponent => {
                feeComponent.feeComponentTypeString = this.feeComponentTypeEnumDetails.filter(x => x.key == feeComponent.feeComponentType)[0].value;
            });
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Student, sidenav_model_1.UserGroupFeatureChildEnum.StudentFeeComponent, type);
    }
};
ListFeeComponentManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-fee-component-list.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService, permission_service_1.PermissionService,
        student_management_fee_component_service_1.FeeComponentManagementService])
], ListFeeComponentManagementComponent);
exports.ListFeeComponentManagementComponent = ListFeeComponentManagementComponent;
//# sourceMappingURL=student-management-fee-component-list.component.js.map