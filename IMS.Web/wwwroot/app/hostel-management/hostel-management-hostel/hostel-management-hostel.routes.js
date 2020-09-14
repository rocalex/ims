"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const hostel_management_hostel_list_component_1 = require("./hostel-management-hostel-list/hostel-management-hostel-list.component");
const hostel_management_hostel_add_component_1 = require("./hostel-management-hostel-add/hostel-management-hostel-add.component");
const edit_component_1 = require("./edit/edit.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const hostelManagementHostelRoutes = [
    {
        path: 'hostel/list',
        children: [
            {
                path: '',
                component: hostel_management_hostel_list_component_1.HostelManagementHostelListComponent,
                canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            },
            {
                path: 'add',
                component: hostel_management_hostel_add_component_1.HostelManagementAddHostelComponent,
                canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            },
            {
                path: ':id',
                component: edit_component_1.EditComponent,
                canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            }
        ]
    },
];
exports.HostelManagementHostelRouting = router_1.RouterModule.forRoot(hostelManagementHostelRoutes);
//# sourceMappingURL=hostel-management-hostel.routes.js.map