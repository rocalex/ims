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
const user_group_management_component_1 = require("./user-group-management.component");
const user_group_management_list_component_1 = require("./user-group-management-list/user-group-management-list.component");
const user_group_management_add_component_1 = require("./user-group-management-add/user-group-management-add.component");
const user_group_management_edit_details_component_1 = require("./user-group-management-edit-details/user-group-management-edit-details.component");
const user_group_management_service_1 = require("./user-group-management.service");
let UserGroupManagementModule = class UserGroupManagementModule {
};
UserGroupManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            user_group_management_component_1.UserGroupManagementComponent,
            user_group_management_list_component_1.UserGroupManagementListComponent,
            user_group_management_add_component_1.UserGroupManagementAddComponent,
            user_group_management_edit_details_component_1.UserGroupManagementEditDetailsComponent
        ],
        providers: [
            user_group_management_service_1.UserGroupManagementService
        ],
    })
], UserGroupManagementModule);
exports.UserGroupManagementModule = UserGroupManagementModule;
//# sourceMappingURL=user-group-management.module.js.map