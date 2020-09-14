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
const staff_management_department_service_1 = require("../staff-management-department.service");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
let AddDepartmentManagementComponent = class AddDepartmentManagementComponent {
    constructor(staffDepartmentManagementService, loaderService, router, snackBar) {
        this.staffDepartmentManagementService = staffDepartmentManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.departmentName = null;
        this.departmentCode = null;
        this.departmentDescription = null;
        this.errorMessage = '';
    }
    ngOnInit() { }
    addDepartment() {
        this.loaderService.toggleLoader(true);
        this.staffDepartmentManagementService.addDepartment({ DepartmentName: this.departmentName, Code: this.departmentCode, Description: this.departmentDescription })
            .then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['staff', 'department', 'list']);
            }
            else {
                this.errorMessage = response.message;
            }
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
            console.log(err.json());
        });
    }
    checkWhiteSpace(departmentNameModel, departmentCodeModel) {
        departmentNameModel.whiteSpaceError = '';
        departmentCodeModel.whiteSpaceError = '';
        if (this.departmentName !== null && this.departmentName !== undefined && this.departmentName.trim() === '') {
            departmentNameModel.whiteSpaceError = 'Department Name can\'t be null or empty';
        }
        if (this.departmentCode !== null && this.departmentCode !== undefined && this.departmentCode.trim() === '') {
            departmentCodeModel.whiteSpaceError = 'Department Code can\'t be null or empty';
        }
    }
    resetError(departmentNameModel, departmentCodeModel) {
        departmentNameModel.whiteSpaceError = '';
        this.errorMessage = '';
    }
};
AddDepartmentManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-department-add.html'
    }),
    __metadata("design:paramtypes", [staff_management_department_service_1.StaffDepartmentManagementService,
        loader_service_1.LoaderService,
        router_1.Router,
        snackbar_service_1.SnackbarService])
], AddDepartmentManagementComponent);
exports.AddDepartmentManagementComponent = AddDepartmentManagementComponent;
//# sourceMappingURL=staff-management-department-add.component.js.map