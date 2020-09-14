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
const http_service_1 = require("../../../../core/http.service");
let StudentManagementExamDefinitionService = class StudentManagementExamDefinitionService {
    constructor(http) {
        this.http = http;
        this.ExamDefinitionManagementUrl = 'api/markmanagement/examdefinition';
    }
    addInstituteExamDefinition(examDefinition) {
        return this.http.post(this.ExamDefinitionManagementUrl, examDefinition);
    }
    getAllInstituteExamDefinition() {
        return this.http.get(this.ExamDefinitionManagementUrl);
    }
    getInstituteExamDefinitionDetail(examDefinitionId) {
        return this.http.get(this.ExamDefinitionManagementUrl + '/' + examDefinitionId);
    }
    updateInstituteExamDefinition(examDefinition) {
        return this.http.put(this.ExamDefinitionManagementUrl, examDefinition);
    }
};
StudentManagementExamDefinitionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], StudentManagementExamDefinitionService);
exports.StudentManagementExamDefinitionService = StudentManagementExamDefinitionService;
//# sourceMappingURL=student-management-examdefinition.service.js.map