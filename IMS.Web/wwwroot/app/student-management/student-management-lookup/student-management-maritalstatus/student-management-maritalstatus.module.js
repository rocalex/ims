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
const student_management_maritalstatus_component_1 = require("./student-management-maritalstatus.component");
const student_management_maritalstatus_list_component_1 = require("./student-management-maritalstatus-list/student-management-maritalstatus-list.component");
const student_management_maritalstatus_add_component_1 = require("./student-management-maritalstatus-add/student-management-maritalstatus-add.component");
const student_management_maritalstatus_edit_detail_component_1 = require("./student-management-maritalstatus-edit-detail/student-management-maritalstatus-edit-detail.component");
const student_management_maritalstatus_service_1 = require("./student-management-maritalstatus.service");
let MaritalStatusManagementModule = class MaritalStatusManagementModule {
};
MaritalStatusManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            student_management_maritalstatus_component_1.MaritalStatusManagementComponent,
            student_management_maritalstatus_list_component_1.ListMaritalStatusManagementComponent,
            student_management_maritalstatus_add_component_1.AddMaritalStatusManagementComponent,
            student_management_maritalstatus_edit_detail_component_1.EditAndDetailMaritalStatusManagementComponent
        ],
        providers: [
            student_management_maritalstatus_service_1.MaritalStatusManagementService
        ],
    })
], MaritalStatusManagementModule);
exports.MaritalStatusManagementModule = MaritalStatusManagementModule;
//# sourceMappingURL=student-management-maritalstatus.module.js.map