"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../shared/shared.module");
const institute_management_service_1 = require("./institute-management.service");
const institute_management_component_1 = require("./institute-management.component");
const institute_management_routes_1 = require("./institute-management.routes");
const institute_management_list_component_1 = require("./institute-management-list/institute-management-list.component");
const institute_management_add_component_1 = require("./institute-management-add/institute-management-add.component");
const institute_management_edit_component_1 = require("./institute-management-edit/institute-management-edit.component");
let InstituteManagementModule = class InstituteManagementModule {
};
InstituteManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            institute_management_routes_1.InstituteManagementRouting
        ],
        declarations: [
            institute_management_component_1.InstituteManagementComponent,
            institute_management_add_component_1.InstituteManagementAddComponent,
            institute_management_list_component_1.InstituteManagementListComponent,
            institute_management_edit_component_1.InstituteManagementEditComponent
        ],
        providers: [
            institute_management_service_1.InstituteManagementService
        ],
    })
], InstituteManagementModule);
exports.InstituteManagementModule = InstituteManagementModule;
//# sourceMappingURL=institute-management.module.js.map