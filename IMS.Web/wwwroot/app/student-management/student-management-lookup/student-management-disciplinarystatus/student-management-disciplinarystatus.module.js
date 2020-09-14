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
const student_management_disciplinarystatus_component_1 = require("./student-management-disciplinarystatus.component");
const student_management_disciplinarystatus_list_component_1 = require("./student-management-disciplinarystatus-list/student-management-disciplinarystatus-list.component");
const student_management_disciplinarystatus_add_component_1 = require("./student-management-disciplinarystatus-add/student-management-disciplinarystatus-add.component");
const student_management_disciplinarystatus_edit_component_1 = require("./student-management-disciplinarystatus-edit-detail/student-management-disciplinarystatus-edit.component");
const student_management_disciplinarystatus_service_1 = require("./student-management-disciplinarystatus.service");
let DisciplinaryStatusManagementModule = class DisciplinaryStatusManagementModule {
};
DisciplinaryStatusManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule
        ],
        declarations: [
            student_management_disciplinarystatus_component_1.DisciplinaryStatusManagementComponent,
            student_management_disciplinarystatus_list_component_1.ListDisciplinaryStatusManagementComponent,
            student_management_disciplinarystatus_add_component_1.AddDisciplinaryStatusManagementComponent,
            student_management_disciplinarystatus_edit_component_1.EditAndDetailDisciplinaryStatusManagementComponent
        ],
        providers: [
            student_management_disciplinarystatus_service_1.DisciplinaryStatusManagementService
        ],
    })
], DisciplinaryStatusManagementModule);
exports.DisciplinaryStatusManagementModule = DisciplinaryStatusManagementModule;
//# sourceMappingURL=student-management-disciplinarystatus.module.js.map