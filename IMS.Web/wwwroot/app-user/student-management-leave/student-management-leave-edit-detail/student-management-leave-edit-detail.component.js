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
const loader_service_1 = require("../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../shared/snackbar-service");
const student_management_leave_model_1 = require("../student-management-leave.model");
let EditAndDetailStudentLeaveManagementComponent = class EditAndDetailStudentLeaveManagementComponent {
    constructor(studentLeaveManagementService, loaderService, router, snackBar, activeRoute) {
        this.studentLeaveManagementService = studentLeaveManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.activeRoute = activeRoute;
        this.initialData = {};
        this.leave = new student_management_leave_model_1.UpdateStudentLeaveAc();
        this.students = [];
        this.leaveTypes = [];
        this.alreadyTakenLeaveCount = 0;
        this.todayDate = new Date();
    }
    ngOnInit() {
        this.activeRoute.params.subscribe(res => this.leave.Id === +res.id);
        this.getInitialData();
    }
    getStudentLeave() {
        this.loaderService.toggleLoader(true);
        this.studentLeaveManagementService.getStudentLeave(this.leave.Id).then(res => {
            var response = res.json();
            if (!response) {
                this.router.navigate(['leave', 'list']);
            }
            else {
                this.leave.ApprovedById = response.approvedById;
                this.leave.EndDate = new Date(response.endDate);
                this.leave.FromDate = new Date(response.fromDate);
                this.leave.LeaveTypeId = response.leaveTypeId;
                this.leave.Reason = response.reason;
                this.leave.StatusId = response.statusId;
                this.leave.StudentId = response.studentId;
                this.leave.ClassId = response.student.currentClassId;
                this.assignStudent();
                this.assignLeaveTypes();
            }
            this.loaderService.toggleLoader(false);
        });
    }
    getInitialData() {
        this.loaderService.toggleLoader(true);
        this.studentLeaveManagementService.getInitialData().then(res => {
            this.initialData = res.json();
            this.getStudentLeave();
            this.loaderService.toggleLoader(false);
        });
    }
    endDateValid() {
        if (this.leave.FromDate) {
            return this.leave.FromDate;
        }
        else {
            return this.todayDate;
        }
    }
    getStudentAlreadyTakenLeaveCount() {
        this.loaderService.toggleLoader(true);
        var countModel = { StudentId: this.leave.StudentId, LeaveTypeId: this.leave.LeaveTypeId };
        this.studentLeaveManagementService.getStudentAlreadyTakenLeaveCount(countModel).then(res => {
            var response = res.json();
            this.alreadyTakenLeaveCount = response.count;
            this.loaderService.toggleLoader(false);
        });
    }
    assignStudent() {
        this.students = this.initialData.students.filter(x => x.currentClassId === this.leave.ClassId);
        var classData = this.initialData.classes.find(x => x.id === this.leave.ClassId);
    }
    assignLeaveTypes() {
        var allowedTos = [];
        for (var i = 0; i < this.initialData.leaveTypes.length; i++) {
            var allow = this.initialData.leaveTypes[i].leaveAssignedTos;
            for (var j = 0; j < allow.length; j++) {
                allowedTos.push(allow[j]);
            }
        }
        var student = this.students.find(x => x.id === this.leave.StudentId);
        var studentLeaveType = allowedTos.filter(x => x.userId === student.userId);
        var leaveTypeIds = studentLeaveType.map(x => x.leaveTypeId);
        leaveTypeIds = this.distinct(leaveTypeIds);
        this.leaveTypes = [];
        for (var i = 0; i < leaveTypeIds.length; i++) {
            this.leaveTypes.push(this.initialData.leaveTypes.find(x => x.id === leaveTypeIds[i]));
        }
    }
    distinct(arr) {
        var unique = arr.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        return unique;
    }
    numberOfDays() {
        if (this.leave.FromDate && this.leave.EndDate) {
            const diffTime = Math.abs(this.leave.FromDate.getTime() - this.leave.EndDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays + 1;
        }
        else {
            return 0;
        }
    }
    balanceLeave() {
        if (this.leave.LeaveTypeId) {
            var leaveType = this.initialData.leaveTypes.find(x => x.id === this.leave.LeaveTypeId);
            var diff = leaveType.numberOfAllowedLeave - this.alreadyTakenLeaveCount;
            return diff;
        }
        else {
            return 0;
        }
    }
    updateStudentLeave() {
        this.loaderService.toggleLoader(true);
        this.activeRoute.params.subscribe(res => this.leave.Id = +res.id);
        this.studentLeaveManagementService.updateStudentLeave(this.leave).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['leave', 'list']);
            }
            this.snackBar.showSnackbar(response.message);
            this.loaderService.toggleLoader(false);
        });
    }
};
EditAndDetailStudentLeaveManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-leave-edit-detail.html'
    }),
    __metadata("design:paramtypes", [student_management_leave_service_1.StudentLeaveManagementService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService, router_1.ActivatedRoute])
], EditAndDetailStudentLeaveManagementComponent);
exports.EditAndDetailStudentLeaveManagementComponent = EditAndDetailStudentLeaveManagementComponent;
//# sourceMappingURL=student-management-leave-edit-detail.component.js.map