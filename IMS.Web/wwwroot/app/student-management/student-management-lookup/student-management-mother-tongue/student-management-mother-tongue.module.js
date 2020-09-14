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
const student_management_mother_tongue_component_1 = require("./student-management-mother-tongue.component");
const student_management_mother_tongue_list_component_1 = require("./student-management-mother-tongue-list/student-management-mother-tongue-list.component");
const student_management_mother_tongue_add_component_1 = require("./student-management-mother-tongue-add/student-management-mother-tongue-add.component");
const student_management_mother_tongue_edit_details_component_1 = require("./student-management-mother-tongue-edit-details/student-management-mother-tongue-edit-details.component");
const student_management_mother_tongue_service_1 = require("./student-management-mother-tongue.service");
let MotherTongueManagementModule = class MotherTongueManagementModule {
};
MotherTongueManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            student_management_mother_tongue_component_1.MotherTongueManagementComponent,
            student_management_mother_tongue_list_component_1.ListMotherTongueManagementComponent,
            student_management_mother_tongue_add_component_1.AddMotherTongueManagementComponent,
            student_management_mother_tongue_edit_details_component_1.EditDetailsMotherTongueManagementComponent
        ],
        providers: [
            student_management_mother_tongue_service_1.MotherTongueManagementService
        ],
    })
], MotherTongueManagementModule);
exports.MotherTongueManagementModule = MotherTongueManagementModule;
//# sourceMappingURL=student-management-mother-tongue.module.js.map