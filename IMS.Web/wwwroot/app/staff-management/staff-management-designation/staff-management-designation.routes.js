"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const staff_management_designation_list_component_1 = require("./staff-management-designation-list/staff-management-designation-list.component");
const staff_management_designation_add_component_1 = require("./staff-management-designation-add/staff-management-designation-add.component");
const staff_management_designation_edit_details_component_1 = require("./staff-management-designation-edit-details/staff-management-designation-edit-details.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const staffDesignationManagementRoutes = [
    {
        path: 'staff/designation',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list', component: staff_management_designation_list_component_1.ListDesignationManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffDesignation, type: 'View' }
            },
            {
                path: 'add', component: staff_management_designation_add_component_1.AddDesignationManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffDesignation, type: 'Add' }
            },
            {
                path: ':id', component: staff_management_designation_edit_details_component_1.EditDetailsDesignationManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffDesignation, type: 'Edit' }
            }
        ]
    },
];
exports.StaffDesignationManagementRouting = router_1.RouterModule.forRoot(staffDesignationManagementRoutes);
//# sourceMappingURL=staff-management-designation.routes.js.map