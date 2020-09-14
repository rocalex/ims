"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../../shared/shared.module");
const student_management_mark_routes_1 = require("./student-management-mark.routes");
const student_management_mark_component_1 = require("./student-management-mark.component");
const student_management_examdefinition_module_1 = require("./student-management-examdefinition/student-management-examdefinition.module");
const student_management_classexam_module_1 = require("./student-management-classexam/student-management-classexam.module");
const student_management_mark_examscoreentry_module_1 = require("./student-management-mark-examscoreentry/student-management-mark-examscoreentry.module");
let StudentManagementMarkModule = class StudentManagementMarkModule {
};
StudentManagementMarkModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            student_management_mark_routes_1.StudentManagementMarkRoutes,
            student_management_examdefinition_module_1.StudentManagementExamDefinitionModule,
            student_management_classexam_module_1.StudentManagementClassExamModule,
            student_management_mark_examscoreentry_module_1.StudentManagementExamScoreEntryModule
        ],
        declarations: [
            student_management_mark_component_1.StudentManagementMarkComponent
        ],
        providers: [],
    })
], StudentManagementMarkModule);
exports.StudentManagementMarkModule = StudentManagementMarkModule;
//# sourceMappingURL=student-management-mark.module.js.map