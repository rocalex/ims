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
const loader_service_1 = require("../../../shared/loader-service");
const student_management_inactive_service_1 = require("./student-management-inactive.service");
let StudentManagementInActiveComponent = class StudentManagementInActiveComponent {
    constructor(studentManagementService, loaderService) {
        this.studentManagementService = studentManagementService;
        this.loaderService = loaderService;
        this.students = [];
    }
    ngOnInit() {
        this.getAllStudentByInsituteId();
    }
    getAllStudentByInsituteId() {
        this.loaderService.toggleLoader(true);
        this.studentManagementService.getAllInActiveStudentByInsituteId().then(res => {
            this.students = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    markActiveAndInActiveStudent(studentId) {
        this.loaderService.toggleLoader(true);
        this.studentManagementService.markActiveAndInActiveStudent(studentId).then(res => {
            this.ngOnInit();
            this.loaderService.toggleLoader(false);
        });
    }
};
StudentManagementInActiveComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-inactive.html'
    }),
    __metadata("design:paramtypes", [student_management_inactive_service_1.StudentManagementInActiveService, loader_service_1.LoaderService])
], StudentManagementInActiveComponent);
exports.StudentManagementInActiveComponent = StudentManagementInActiveComponent;
//# sourceMappingURL=student-management-inactive.component.js.map