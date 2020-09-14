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
const loader_service_1 = require("../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const student_management_relieving_service_1 = require("../student-management-relieving.service");
const student_management_relieving_model_1 = require("../student-management-relieving.model");
let EditAndDetailStudentRelievingManagementComponent = class EditAndDetailStudentRelievingManagementComponent {
    constructor(studentManagementService, loaderService, router, snackBar, activeRoute) {
        this.studentManagementService = studentManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.activeRoute = activeRoute;
        this.student = {};
        this.relievingTypes = ['Passed Out', 'Transfer', 'Termination'];
    }
    ngOnInit() {
        this.activeRoute.params.subscribe(res => this.relievingId = +(res.id));
        this.getStudentDetail();
    }
    getStudentDetail() {
        this.loaderService.toggleLoader(true);
        this.studentManagementService.getStudentDetail(this.relievingId).then(res => {
            this.student = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    updateStudent() {
        this.loaderService.toggleLoader(true);
        var studentDetail = new student_management_relieving_model_1.UpdateStudentInformationManagementAc();
        studentDetail.Id = this.relievingId;
        studentDetail.Reason = this.student.reason;
        studentDetail.RelievingDate = this.convertDateToUtc(this.student.relievingDate);
        studentDetail.StudentId = this.student.studentId;
        studentDetail.StudentRelieving = this.student.studentRelievingDescription;
        this.studentManagementService.updateStudent(studentDetail).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['student', 'relieving', 'list']);
            }
            this.snackBar.showSnackbar(response.message);
            this.loaderService.toggleLoader(false);
        });
    }
    convertDateToUtc(dateString) {
        var date = new Date(dateString);
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    }
};
EditAndDetailStudentRelievingManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-relieving-edit-detail.html'
    }),
    __metadata("design:paramtypes", [student_management_relieving_service_1.StudentRelievingManagementService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService, router_1.ActivatedRoute])
], EditAndDetailStudentRelievingManagementComponent);
exports.EditAndDetailStudentRelievingManagementComponent = EditAndDetailStudentRelievingManagementComponent;
//# sourceMappingURL=student-management-relieving-edit-detail.component.js.map