"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const user_management_component_1 = require("./user-management.component");
const user_list_component_1 = require("./user/user-list/user-list.component");
const user_add_component_1 = require("./user/user-add/user-add.component");
const user_edit_details_component_1 = require("./user/user-edit-details/user-edit-details.component");
const user_group_feature_management_list_component_1 = require("./user-group-feature-management/user-group-feature-management-list/user-group-feature-management-list.component");
const user_group_feature_management_edit_detail_component_1 = require("./user-group-feature-management/user-group-feature-management-edit-detail/user-group-feature-management-edit-detail.component");
const user_group_management_list_component_1 = require("./user-group-management/user-group-management-list/user-group-management-list.component");
const user_group_management_add_component_1 = require("./user-group-management/user-group-management-add/user-group-management-add.component");
const user_group_management_edit_details_component_1 = require("./user-group-management/user-group-management-edit-details/user-group-management-edit-details.component");
const permissions_route_guard_1 = require("../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../shared/sidenav/sidenav.model");
const userManagementRoutes = [
    {
        path: 'usermanagement', component: user_management_component_1.UserManagementComponent,
        children: [
            {
                path: 'user',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: user_list_component_1.UserListComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.UserManagementUsers, type: 'View' }
                    },
                    {
                        path: 'add', component: user_add_component_1.UserAddComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.UserManagementUsers, type: 'Add' }
                    },
                    {
                        path: ':id', component: user_edit_details_component_1.UserEditDetailsComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.UserManagementUsers, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'permission',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: user_group_feature_management_list_component_1.ListUserGroupFeatureManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.UserManagementPermission, type: 'View' }
                    },
                    {
                        path: ':id', component: user_group_feature_management_edit_detail_component_1.EditAndDetailUserGroupFeatureManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.UserManagementPermission, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'role',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: user_group_management_list_component_1.UserGroupManagementListComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.UserManagementRole, type: 'View' }
                    },
                    {
                        path: 'add', component: user_group_management_add_component_1.UserGroupManagementAddComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.UserManagementRole, type: 'Add' }
                    },
                    {
                        path: ':id', component: user_group_management_edit_details_component_1.UserGroupManagementEditDetailsComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.UserManagementRole, type: 'Edit' }
                    }
                ]
            }
        ]
    },
];
exports.UserManagementRouting = router_1.RouterModule.forRoot(userManagementRoutes);
//# sourceMappingURL=user-management.routes.js.map