"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const staff_management_information_list_component_1 = require("./staff-management-information-list/staff-management-information-list.component");
const staff_management_information_add_component_1 = require("./staff-management-information-add/staff-management-information-add.component");
const staff_management_information_edit_detail_component_1 = require("./staff-management-information-edit-detail/staff-management-information-edit-detail.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const staffManagementRoutes = [
    {
        path: 'staff/master',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list', component: staff_management_information_list_component_1.ListStaffManagementInformationComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffInfo, type: 'View' }
            },
            {
                path: 'add', component: staff_management_information_add_component_1.AddStaffManagementInformationComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffInfo, type: 'Add' }
            },
            {
                path: ':id', component: staff_management_information_edit_detail_component_1.EditAndDetailStaffManagementInformationComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffInfo, type: 'Edit' }
            }
        ]
    },
];
exports.StaffManagementInformationRouting = router_1.RouterModule.forRoot(staffManagementRoutes);
//# sourceMappingURL=staff-management-information.routes.js.map