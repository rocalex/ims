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
const student_management_religion_component_1 = require("./student-management-religion.component");
const student_management_religion_list_component_1 = require("./student-management-religion-list/student-management-religion-list.component");
const student_management_religion_add_component_1 = require("./student-management-religion-add/student-management-religion-add.component");
const student_management_religion_edit_detail_component_1 = require("./student-management-religion-edit-detail/student-management-religion-edit-detail.component");
const student_management_religion_service_1 = require("./student-management-religion.service");
let ReligionManagementModule = class ReligionManagementModule {
};
ReligionManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            student_management_religion_component_1.ReligionManagementComponent,
            student_management_religion_list_component_1.ListReligionManagementComponent,
            student_management_religion_add_component_1.AddReligionManagementComponent,
            student_management_religion_edit_detail_component_1.EditAndDetailReligionManagementComponent
        ],
        providers: [
            student_management_religion_service_1.ReligionManagementService
        ],
    })
], ReligionManagementModule);
exports.ReligionManagementModule = ReligionManagementModule;
//# sourceMappingURL=student-management-religion.module.js.map