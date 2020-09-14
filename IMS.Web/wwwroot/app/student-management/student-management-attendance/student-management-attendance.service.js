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
const http_service_1 = require("../../../core/http.service");
let StudentAttendanceManagementService = class StudentAttendanceManagementService {
    constructor(http) {
        this.http = http;
        this.StudentAttendanceManagementUrl = 'api/studentattendancemanagement';
    }
    getIntialDataForPromotion() {
        return this.http.get('api/studentpromotionmanagement/intialdata');
    }
    getStudentByClassId(classId, sectionId) {
        return this.http.get('api/studentpromotionmanagement/classstudent/' + classId + '/' + sectionId);
    }
    addStudentAttendance(attendance) {
        return this.http.post(this.StudentAttendanceManagementUrl, attendance);
    }
    getStudentAttendance(studentQuery) {
        return this.http.post(this.StudentAttendanceManagementUrl + '/search', studentQuery);
    }
    getWeekOffsByCurrentAcademicYearId() {
        return this.http.get(this.StudentAttendanceManagementUrl + '/weekoff');
    }
};
StudentAttendanceManagementService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], StudentAttendanceManagementService);
exports.StudentAttendanceManagementService = StudentAttendanceManagementService;
//# sourceMappingURL=student-management-attendance.service.js.map