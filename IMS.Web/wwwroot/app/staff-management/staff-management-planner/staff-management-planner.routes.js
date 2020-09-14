"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const staff_management_planner_list_component_1 = require("./staff-management-planner-list/staff-management-planner-list.component");
const staff_management_planner_add_component_1 = require("./staff-management-planner-add/staff-management-planner-add.component");
const staff_management_planner_edit_details_component_1 = require("./staff-management-planner-edit-details/staff-management-planner-edit-details.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const staffPlannerManagementRoutes = [
    {
        path: 'staff/planner',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list', component: staff_management_planner_list_component_1.ListStaffPlannerManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffPlanner, type: 'View' }
            },
            {
                path: 'add', component: staff_management_planner_add_component_1.AddStaffPlannerManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffPlanner, type: 'Add' }
            },
            {
                path: ':id', component: staff_management_planner_edit_details_component_1.EditDetailsStaffPlannerManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffPlanner, type: 'Edit' }
            }
        ]
    },
];
exports.StaffPlannerManagementRouting = router_1.RouterModule.forRoot(staffPlannerManagementRoutes);
//# sourceMappingURL=staff-management-planner.routes.js.map