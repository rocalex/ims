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
let EditDetailsDepartmentManagementComponent = class EditDetailsDepartmentManagementComponent {
    constructor(staffDepartmentManagementService, loader, router, activatedRoute, snackBar) {
        this.staffDepartmentManagementService = staffDepartmentManagementService;
        this.loader = loader;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.snackBar = snackBar;
        this.errorMessage = '';
        this.department = {};
        this.activatedRoute.params.subscribe(param => this.departmentId = param.id);
    }
    ngOnInit() {
        this.getDepartment();
    }
    getDepartment() {
        this.loader.toggleLoader(true);
        this.staffDepartmentManagementService.getDepartmentDetail(this.departmentId)
            .then(res => {
            this.department = res.json();
            this.loader.toggleLoader(false);
        })
            .catch(err => {
            this.loader.toggleLoader(false);
            console.log(err.json());
        });
    }
    updateDepartment() {
        this.loader.toggleLoader(true);
        this.staffDepartmentManagementService.updateDepartment(this.department)
            .then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['staff', 'department', 'list']);
            }
            else {
                this.errorMessage = response.message;
            }
            this.loader.toggleLoader(false);
        })
            .catch(err => {
            this.loader.toggleLoader(false);
            console.log(err.json());
        });
    }
    checkWhiteSpace(departmentNameModel, departmentCodeModel) {
        departmentNameModel.whiteSpaceError = '';
        departmentCodeModel.whiteSpaceError = '';
        if (this.department.departmentName !== null && this.department.departmentName !== undefined && this.department.departmentName.trim() === '') {
            departmentNameModel.whiteSpaceError = 'Department Name can\'t be null or empty';
        }
        if (this.department.code !== null && this.department.code !== undefined && this.department.code.trim() === '') {
            departmentCodeModel.whiteSpaceError = 'Department Code can\'t be null or empty';
        }
    }
    resetError(departmentNameModel, departmentCodeModel) {
        if (this.department.departmentName === null || this.department.departmentName === undefined || this.department.departmentName.trim() !== '') {
            departmentNameModel.whiteSpaceError = '';
        }
        if (this.department.code === null || this.department.code === undefined || this.department.code.trim() !== '') {
            departmentCodeModel.whiteSpaceError = '';
        }
        this.errorMessage = '';
    }
};
EditDetailsDepartmentManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-department-edit-details.html'
    }),
    __metadata("design:paramtypes", [staff_management_department_service_1.StaffDepartmentManagementService,
        loader_service_1.LoaderService,
        router_1.Router,
        router_1.ActivatedRoute,
        snackbar_service_1.SnackbarService])
], EditDetailsDepartmentManagementComponent);
exports.EditDetailsDepartmentManagementComponent = EditDetailsDepartmentManagementComponent;
//# sourceMappingURL=staff-management-department-edit-details.component.js.map