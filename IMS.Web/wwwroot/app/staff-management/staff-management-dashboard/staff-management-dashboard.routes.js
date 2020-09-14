"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const staff_management_dashboard_component_1 = require("./staff-management-dashboard.component");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const staffManagementDashboardRoutes = [
    {
        path: 'staff/dashboard',
        children: [
            {
                path: '', component: staff_management_dashboard_component_1.StaffManagementDashboardComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffDashboard, type: 'View' }
            }
        ]
    },
];
exports.StaffManagementDashboardRouting = router_1.RouterModule.forRoot(staffManagementDashboardRoutes);
//# sourceMappingURL=staff-management-dashboard.routes.js.map