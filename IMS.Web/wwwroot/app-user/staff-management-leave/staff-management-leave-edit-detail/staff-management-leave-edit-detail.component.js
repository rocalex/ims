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
const staff_management_leave_service_1 = require("../staff-management-leave.service");
const loader_service_1 = require("../../../shared/loader-service");
const snackbar_service_1 = require("../../../shared/snackbar-service");
const router_1 = require("@angular/router");
const staff_management_leave_model_1 = require("../staff-management-leave.model");
let EditAndDetailStaffLeaveManagementComponent = class EditAndDetailStaffLeaveManagementComponent {
    constructor(staffLeaveManagementService, loaderService, router, snackBar, activeRoute) {
        this.staffLeaveManagementService = staffLeaveManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.activeRoute = activeRoute;
        this.initialData = {};
        this.leave = new staff_management_leave_model_1.UpdateStaffLeaveAc();
        this.leaveTypes = [];
        this.alreadyTakenLeaveCount = 0;
        this.todayDate = new Date();
    }
    ngOnInit() {
        this.activeRoute.params.subscribe(res => this.leave.Id = +res.id);
        this.getInitialData();
    }
    getInitialData() {
        this.loaderService.toggleLoader(true);
        this.staffLeaveManagementService.getInitialData().then(res => {
            this.initialData = res.json();
            this.getStaffLeave();
            this.loaderService.toggleLoader(false);
        });
    }
    getStaffLeave() {
        this.loaderService.toggleLoader(true);
        this.staffLeaveManagementService.getStaffLeave(this.leave.Id).then(res => {
            var response = res.json();
            if (!response) {
                this.router.navigate(['leavemanagement', 'list']);
            }
            else {
                this.leave.ApprovedById = response.approvedById;
                this.leave.EndDate = new Date(response.endDate);
                this.leave.FromDate = new Date(response.fromDate);
                this.leave.LeaveTypeId = response.leaveTypeId;
                this.leave.Reason = response.reason;
                this.leave.StatusId = response.statusId;
                this.leave.StaffId = response.staffId;
                this.assignLeaveTypes();
            }
            this.loaderService.toggleLoader(false);
        });
    }
    updateStaffLeave() {
        this.loaderService.toggleLoader(true);
        this.activeRoute.params.subscribe(res => this.leave.Id = +res.id);
        this.staffLeaveManagementService.updateStaffLeave(this.leave).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['leavemanagement', 'list']);
            }
            this.snackBar.showSnackbar(response.message);
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
    assignLeaveTypes() {
        var allowedTos = [];
        for (var i = 0; i < this.initialData.leaveTypes.length; i++) {
            var allow = this.initialData.leaveTypes[i].leaveAssignedTos;
            for (var j = 0; j < allow.length; j++) {
                allowedTos.push(allow[j]);
            }
        }
        var Staff = this.initialData.staffs.find(x => x.id === this.leave.StaffId);
        var StaffLeaveType = allowedTos.filter(x => x.userId === Staff.userId);
        var leaveTypeIds = StaffLeaveType.map(x => x.leaveTypeId);
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
    getStaffAlreadyTakenLeaveCount() {
        this.loaderService.toggleLoader(true);
        var countModel = { StaffId: this.leave.StaffId, LeaveTypeId: this.leave.LeaveTypeId };
        this.staffLeaveManagementService.getStaffAlreadyTakenLeaveCount(countModel).then(res => {
            var response = res.json();
            this.alreadyTakenLeaveCount = response.count;
            this.loaderService.toggleLoader(false);
        });
    }
};
EditAndDetailStaffLeaveManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-leave-edit-detail.html'
    }),
    __metadata("design:paramtypes", [staff_management_leave_service_1.StaffLeaveManagementService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService, router_1.ActivatedRoute])
], EditAndDetailStaffLeaveManagementComponent);
exports.EditAndDetailStaffLeaveManagementComponent = EditAndDetailStaffLeaveManagementComponent;
//# sourceMappingURL=staff-management-leave-edit-detail.component.js.map