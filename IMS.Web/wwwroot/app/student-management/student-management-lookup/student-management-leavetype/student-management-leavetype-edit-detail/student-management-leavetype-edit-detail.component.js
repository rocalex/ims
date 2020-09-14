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
const student_management_leavetype_service_1 = require("../student-management-leavetype.service");
const loader_service_1 = require("../../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const student_management_leavetype_model_1 = require("../student-management-leavetype.model");
let EditAndDetailLeaveTypeManagementComponent = class EditAndDetailLeaveTypeManagementComponent {
    constructor(leaveTypeManagementService, loaderService, router, snackBar, activeRoute) {
        this.leaveTypeManagementService = leaveTypeManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.activeRoute = activeRoute;
        this.baseModel = new student_management_leavetype_model_1.UpdateLeaveTypeManagementAc();
        this.error = new student_management_leavetype_model_1.LeaveTypeManagementResponse();
        this.inititalData = {};
        this.assignedTypes = ['All', 'Student', 'Staff', 'Users'];
        this.users = [];
    }
    ngOnInit() {
        this.activeRoute.params.subscribe(res => this.baseModel.Id = +res.id);
        this.getInititalData();
    }
    getInititalData() {
        this.loaderService.toggleLoader(true);
        this.leaveTypeManagementService.getInititalData().then(res => {
            this.inititalData = res.json();
            this.getInstituteLeaveTypeDetail();
            this.loaderService.toggleLoader(false);
        });
    }
    getInstituteLeaveTypeDetail() {
        this.loaderService.toggleLoader(true);
        this.leaveTypeManagementService.getInstituteLeaveTypeDetail(this.baseModel.Id).then(res => {
            var response = res.json();
            if (!response) {
                this.snackBar.showSnackbar('Leave type not found');
                this.router.navigate(['student', 'lookup', 'leavetype', 'list']);
            }
            else {
                this.baseModel.Name = response.name;
                this.baseModel.Code = response.code;
                this.baseModel.Description = response.description;
                this.baseModel.LeaveAssignedTypeEnumDescription = response.leaveAssignedTypeEnumDescription;
                this.baseModel.NumberOfAllowedLeave = response.numberOfAllowedLeave;
                this.assignUser();
                this.baseModel.LeaveAssignedTos = response.leaveAssignedTos.map(x => x.userId);
            }
            this.loaderService.toggleLoader(false);
        });
    }
    updateInstituteLeaveType() {
        this.loaderService.toggleLoader(true);
        this.leaveTypeManagementService.updateInstituteLeaveType(this.baseModel).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['student', 'lookup', 'leavetype', 'list']);
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.error = new student_management_leavetype_model_1.LeaveTypeManagementResponse();
                this.error.ErrorType = response.errorType;
                this.error.HasError = response.hasError;
                this.error.Message = response.message;
            }
            this.loaderService.toggleLoader(false);
        });
    }
    hasError(fieldName) {
        var id = student_management_leavetype_model_1.LeaveTypeManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        }
        else {
            return false;
        }
    }
    resetError(fieldName) {
        var id = student_management_leavetype_model_1.LeaveTypeManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new student_management_leavetype_model_1.LeaveTypeManagementResponse();
        }
    }
    assignUser() {
        this.baseModel.LeaveAssignedTos = [];
        this.users = [];
        switch (this.baseModel.LeaveAssignedTypeEnumDescription) {
            case 'All':
                {
                    this.users.push({ name: 'Students', list: this.inititalData.groupUsers.students });
                    this.users.push({ name: 'Staffs', list: this.inititalData.groupUsers.staffs });
                    this.users.push({ name: 'Users', list: this.inititalData.groupUsers.users });
                }
                break;
            case 'Student':
                {
                    this.users.push({ name: 'Students', list: this.inititalData.groupUsers.students });
                }
                break;
            case 'Staff':
                {
                    this.users.push({ name: 'Staffs', list: this.inititalData.groupUsers.staffs });
                }
                break;
            case 'Users':
                {
                    this.users.push({ name: 'Users', list: this.inititalData.groupUsers.users });
                }
                break;
        }
    }
};
EditAndDetailLeaveTypeManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-leavetype-edit-detail.html'
    }),
    __metadata("design:paramtypes", [student_management_leavetype_service_1.LeaveTypeManagementService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService, router_1.ActivatedRoute])
], EditAndDetailLeaveTypeManagementComponent);
exports.EditAndDetailLeaveTypeManagementComponent = EditAndDetailLeaveTypeManagementComponent;
//# sourceMappingURL=student-management-leavetype-edit-detail.component.js.map