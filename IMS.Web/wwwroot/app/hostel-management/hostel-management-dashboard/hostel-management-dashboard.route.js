"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const hostel_management_dashboard_component_1 = require("./hostel-management-dashboard.component");
const hostelManagementDashboardRoutes = [
    {
        path: 'hostel/dashboard',
        children: [
            {
                path: '',
                component: hostel_management_dashboard_component_1.HostelManagementDashboardComponent,
                canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            }
        ]
    },
];
exports.HostelManagementDashboardRouting = router_1.RouterModule.forRoot(hostelManagementDashboardRoutes);
//# sourceMappingURL=hostel-management-dashboard.route.js.map