"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const user_group_feature_management_list_component_1 = require("./user-group-feature-management-list/user-group-feature-management-list.component");
const user_group_feature_management_edit_detail_component_1 = require("./user-group-feature-management-edit-detail/user-group-feature-management-edit-detail.component");
const userGroupFeatureManagementRoutes = [
    {
        path: 'usermanagement/permission',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: user_group_feature_management_list_component_1.ListUserGroupFeatureManagementComponent },
            { path: ':id', component: user_group_feature_management_edit_detail_component_1.EditAndDetailUserGroupFeatureManagementComponent }
        ]
    },
];
exports.UserGroupFeatureManagementRouting = router_1.RouterModule.forRoot(userGroupFeatureManagementRoutes);
//# sourceMappingURL=user-group-feature-management.routes.js.map