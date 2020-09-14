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
const student_management_leave_service_1 = require("../student-management-leave.service");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
const permission_service_1 = require("../../../../shared/permission.service");
let ListStudentLeaveManagementComponent = class ListStudentLeaveManagementComponent {
    constructor(studentLeaveManagementService, loaderService, snackBar, permissionService) {
        this.studentLeaveManagementService = studentLeaveManagementService;
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.permissionService = permissionService;
        this.initialData = {};
        this.leaves = [];
        this.pendings = [];
    }
    ngOnInit() {
        this.getStudentLeaves();
    }
    getStudentLeaves() {
        this.loaderService.toggleLoader(true);
        this.studentLeaveManagementService.getStudentLeaves().then(res => {
            this.initialData = res.json();
            this.getLeave();
            this.loaderService.toggleLoader(false);
        });
    }
    getLeave() {
        this.leaves = this.initialData.leaves.filter(x => x.student.currentClassId === this.classId && x.leaveTypeId === this.leaveTypeId);
        this.pendingList();
    }
    resetLeave() {
        this.leaves = [];
        this.pendingList();
    }
    numberOfDays(fromDate, endDate) {
        if (fromDate && endDate) {
            var FromDate = new Date(fromDate);
            var EndDate = new Date(endDate);
            const diffTime = Math.abs(FromDate.getTime() - EndDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays + 1;
        }
        else {
            return 0;
        }
    }
    pendingList() {
        this.pendings = this.leaves.filter(x => x.leaveStatus.name === 'Pending');
    }
    approveAndRejectLeave(leaveId, type) {
        this.loaderService.toggleLoader(true);
        var leaveChangeRequest = { LeaveId: leaveId, Type: type };
        this.studentLeaveManagementService.approveAndRejectLeave(leaveChangeRequest).then(res => {
            var response = res.json();
            this.snackBar.showSnackbar(response.message);
            this.ngOnInit();
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowedToEdit(id) {
        var leave = this.leaves.find(x => x.id === id);
        return (leave.leaveStatus.name === 'Pending');
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Student, sidenav_model_1.UserGroupFeatureChildEnum.StudentLeaveManagement, type);
    }
};
ListStudentLeaveManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-leave-list.html'
    }),
    __metadata("design:paramtypes", [student_management_leave_service_1.StudentLeaveManagementService, loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService, permission_service_1.PermissionService])
], ListStudentLeaveManagementComponent);
exports.ListStudentLeaveManagementComponent = ListStudentLeaveManagementComponent;
//# sourceMappingURL=student-management-leave-list.component.js.map