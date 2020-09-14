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
let AddStudentRelievingManagementComponent = class AddStudentRelievingManagementComponent {
    constructor(studentManagementService, loaderService, router, snackBar) {
        this.studentManagementService = studentManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.classes = [];
        this.selectedClass = {};
        this.students = [];
        this.reason = '';
        this.relievingTypes = ['Passed Out', 'Transfer', 'Termination'];
        this.selectedStudent = [];
    }
    ngOnInit() {
        this.getAllClasses();
    }
    getAllClasses() {
        this.loaderService.toggleLoader(true);
        this.studentManagementService.getAllClasses().then(res => {
            this.classes = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    getStudentByClassId() {
        this.loaderService.toggleLoader(true);
        this.studentManagementService.getStudentByClassId(this.selectedClass.id).then(res => {
            this.students = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    addStudentDetail() {
        this.loaderService.toggleLoader(true);
        var list = [];
        for (var i = 0; i < this.selectedStudent.length; i++) {
            var data = new student_management_relieving_model_1.AddStudentInformationManagementAc();
            data.Reason = this.reason;
            data.RelievingDate = this.convertDateToUtc(this.relievingDate);
            data.StudentId = this.selectedStudent[i];
            data.StudentRelieving = this.selectedRelievingType;
            list.push(data);
        }
        this.studentManagementService.addStudentDetail(list).then(res => {
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
AddStudentRelievingManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-relieving-add.html'
    }),
    __metadata("design:paramtypes", [student_management_relieving_service_1.StudentRelievingManagementService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService])
], AddStudentRelievingManagementComponent);
exports.AddStudentRelievingManagementComponent = AddStudentRelievingManagementComponent;
//# sourceMappingURL=student-management-relieving-add.component.js.map