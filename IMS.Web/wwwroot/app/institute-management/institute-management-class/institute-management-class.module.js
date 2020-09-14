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
const institute_management_class_component_1 = require("./institute-management-class.component");
const institute_management_class_list_component_1 = require("./institute-management-class-list/institute-management-class-list.component");
const institute_management_class_add_component_1 = require("./institute-management-class-add/institute-management-class-add.component");
const institute_management_class_edit_details_1 = require("./institute-management-class-edit-details/institute-management-class-edit-details");
const institute_management_class_service_1 = require("./institute-management-class.service");
let ClassManagementModule = class ClassManagementModule {
};
ClassManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            institute_management_class_component_1.ClassManagementComponent,
            institute_management_class_list_component_1.ListClassManagementComponent,
            institute_management_class_add_component_1.AddClassManagementComponent,
            institute_management_class_edit_details_1.EditDetailsClassManagementComponent
        ],
        providers: [
            institute_management_class_service_1.ClassManagementService
        ],
    })
], ClassManagementModule);
exports.ClassManagementModule = ClassManagementModule;
//# sourceMappingURL=institute-management-class.module.js.map