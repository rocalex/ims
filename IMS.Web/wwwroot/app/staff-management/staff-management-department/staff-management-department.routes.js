"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const staff_management_department_list_component_1 = require("./staff-management-department-list/staff-management-department-list.component");
const staff_management_department_add_component_1 = require("./staff-management-department-add/staff-management-department-add.component");
const staff_management_department_edit_details_component_1 = require("./staff-management-department-edit-details/staff-management-department-edit-details.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const staffDepartmentManagementRoutes = [
    {
        path: 'staff/department',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list', component: staff_management_department_list_component_1.ListDepartmentManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffDepartment, type: 'View' }
            },
            {
                path: 'add', component: staff_management_department_add_component_1.AddDepartmentManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffDepartment, type: 'Add' }
            },
            {
                path: ':id', component: staff_management_department_edit_details_component_1.EditDetailsDepartmentManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffDepartment, type: 'Edit' }
            }
        ]
    },
];
exports.StaffDepartmentManagementRouting = router_1.RouterModule.forRoot(staffDepartmentManagementRoutes);
//# sourceMappingURL=staff-management-department.routes.js.map