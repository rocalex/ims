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
const snackbar_service_1 = require("../../../shared/snackbar-service");
let ListStudentLeaveManagementComponent = class ListStudentLeaveManagementComponent {
    constructor(studentLeaveManagementService, loaderService, snackBar) {
        this.studentLeaveManagementService = studentLeaveManagementService;
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.initialData = {};
        this.leaves = [];
    }
    ngOnInit() {
        this.getStudentLeaves();
    }
    getStudentLeaves() {
        this.loaderService.toggleLoader(true);
        this.studentLeaveManagementService.getStudentLeaves().then(res => {
            this.initialData = res.json();
            this.leaves = this.initialData.leaves;
            this.loaderService.toggleLoader(false);
        });
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
    isAllowedToEdit(id) {
        var leave = this.leaves.find(x => x.id === id);
        return (leave.leaveStatus.name === 'Pending');
    }
};
ListStudentLeaveManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-leave-list.html'
    }),
    __metadata("design:paramtypes", [student_management_leave_service_1.StudentLeaveManagementService, loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService])
], ListStudentLeaveManagementComponent);
exports.ListStudentLeaveManagementComponent = ListStudentLeaveManagementComponent;
//# sourceMappingURL=student-management-leave-list.component.js.map