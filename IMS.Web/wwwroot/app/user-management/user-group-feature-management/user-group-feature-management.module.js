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
const user_group_feature_management_service_1 = require("./user-group-feature-management.service");
const user_group_feature_management_component_1 = require("./user-group-feature-management.component");
const user_group_feature_management_list_component_1 = require("./user-group-feature-management-list/user-group-feature-management-list.component");
const user_group_feature_management_edit_detail_component_1 = require("./user-group-feature-management-edit-detail/user-group-feature-management-edit-detail.component");
let UserGroupFeatureManagementModule = class UserGroupFeatureManagementModule {
};
UserGroupFeatureManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            user_group_feature_management_component_1.UserGroupFeatureManagementComponent,
            user_group_feature_management_list_component_1.ListUserGroupFeatureManagementComponent,
            user_group_feature_management_edit_detail_component_1.EditAndDetailUserGroupFeatureManagementComponent
        ],
        providers: [
            user_group_feature_management_service_1.UserGroupFeatureManagementService
        ],
    })
], UserGroupFeatureManagementModule);
exports.UserGroupFeatureManagementModule = UserGroupFeatureManagementModule;
//# sourceMappingURL=user-group-feature-management.module.js.map