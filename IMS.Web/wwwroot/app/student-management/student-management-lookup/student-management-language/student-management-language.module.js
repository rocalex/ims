"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../../../shared/shared.module");
const student_management_language_component_1 = require("./student-management-language.component");
const student_management_language_list_component_1 = require("./student-management-language-list/student-management-language-list.component");
const student_management_language_add_component_1 = require("./student-management-language-add/student-management-language-add.component");
const student_management_language_edit_detail_component_1 = require("./student-management-language-edit-detail/student-management-language-edit-detail.component");
const student_management_language_service_1 = require("./student-management-language.service");
let LanguageManagementModule = class LanguageManagementModule {
};
LanguageManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule
        ],
        declarations: [
            student_management_language_component_1.LanguageManagementComponent,
            student_management_language_list_component_1.ListLanguageManagementComponent,
            student_management_language_add_component_1.AddLanguageManagementComponent,
            student_management_language_edit_detail_component_1.EditAndDetailLanguageManagementComponent
        ],
        providers: [
            student_management_language_service_1.LanguageManagementService
        ],
    })
], LanguageManagementModule);
exports.LanguageManagementModule = LanguageManagementModule;
//# sourceMappingURL=student-management-language.module.js.map