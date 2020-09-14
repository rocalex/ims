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
const role_management_service_1 = require("./role-management.service");
const role_management_list_component_1 = require("./role-management-list/role-management-list.component");
const role_management_add_component_1 = require("./role-management-add/role-management-add.component");
const role_management_component_1 = require("./role-management.component");
const role_management_routes_1 = require("./role-management.routes");
let RoleManagementModule = class RoleManagementModule {
};
RoleManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            role_management_routes_1.RoleManagementRouting
        ],
        declarations: [
            role_management_component_1.RoleManagementComponent,
            role_management_add_component_1.RoleManagementAddComponent,
            role_management_list_component_1.RoleManagementListComponent
        ],
        providers: [
            role_management_service_1.RoleManagementService
        ],
    })
], RoleManagementModule);
exports.RoleManagementModule = RoleManagementModule;
//# sourceMappingURL=role-management.module.js.map