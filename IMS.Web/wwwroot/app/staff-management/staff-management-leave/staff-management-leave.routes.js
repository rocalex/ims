"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const staff_management_leave_list_component_1 = require("./staff-management-leave-list/staff-management-leave-list.component");
const staff_management_leave_add_component_1 = require("./staff-management-leave-add/staff-management-leave-add.component");
const staff_management_leave_edit_detail_component_1 = require("./staff-management-leave-edit-detail/staff-management-leave-edit-detail.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const staffLeaveManagementRoutes = [
    {
        path: 'staff/leavemanagement',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list', component: staff_management_leave_list_component_1.ListStaffLeaveManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffLeaveManagement, type: 'View' }
            },
            {
                path: 'add', component: staff_management_leave_add_component_1.AddStaffLeaveManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffLeaveManagement, type: 'Add' }
            },
            {
                path: ':id', component: staff_management_leave_edit_detail_component_1.EditAndDetailStaffLeaveManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffLeaveManagement, type: 'Edit' }
            }
        ]
    },
];
exports.StaffLeaveManagementRouting = router_1.RouterModule.forRoot(staffLeaveManagementRoutes);
//# sourceMappingURL=staff-management-leave.routes.js.map