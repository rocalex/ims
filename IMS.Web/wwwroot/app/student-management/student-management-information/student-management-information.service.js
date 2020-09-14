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
let StudentManagementService = class StudentManagementService {
    constructor(http) {
        this.http = http;
        this.StudentManagementUrl = 'api/studentmanagement';
    }
    addStudentDetail(student) {
        return this.http.post(this.StudentManagementUrl, student);
    }
    getClassList() {
        return this.http.get(this.StudentManagementUrl + '/classlist');
    }
    getInitialDataForAddOrEditStudentBundle() {
        return this.http.get(this.StudentManagementUrl + '/bundle');
    }
    getAllStudentByInsituteId(classId) {
        return this.http.get(this.StudentManagementUrl + `/class/${classId}`);
    }
    getStudentDetail(studentId) {
        return this.http.get(this.StudentManagementUrl + '/' + studentId);
    }
    updateStudent(student) {
        return this.http.put(this.StudentManagementUrl, student);
    }
    addOrUpdateStudentImage(studentId, formData) {
        return this.http.postForFormData(this.StudentManagementUrl + '/image/' + studentId, formData);
    }
    archiveStudent(studentId) {
        return this.http.delete(this.StudentManagementUrl + '/' + studentId);
    }
    addOrUpdateStudentGallery(studentId, formData) {
        return this.http.postForFormData(this.StudentManagementUrl + '/gallery/' + studentId, formData);
    }
    markActiveAndInActiveStudent(studentId) {
        return this.http.delete(this.StudentManagementUrl + '/inactive/' + studentId);
    }
    getAutoSequenceNumberByTypeAndInstituteId() {
        return this.http.get('api/autosequencegeneratormanagement/generator/Roll Number');
    }
    getInititalData() {
        return this.http.get('api/markmanagement/classexam/initialdata');
    }
    importExcelData(formData) {
        return this.http.postForFormData(this.StudentManagementUrl + '/import', formData);
    }
    addOrUpdateStudentDocument(studentId, formData) {
        return this.http.postForFormData(this.StudentManagementUrl + '/document/' + studentId, formData);
    }
    updateDocumentData(updateDocumentData, studentId) {
        return this.http.put(this.StudentManagementUrl + '/documentdata/' + studentId, updateDocumentData);
    }
};
StudentManagementService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], StudentManagementService);
exports.StudentManagementService = StudentManagementService;
//# sourceMappingURL=student-management-information.service.js.map