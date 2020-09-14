"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_dashboard_component_1 = require("./student-management-dashboard.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const studentManagementDashboardRoutes = [
    {
        path: 'student/dashboard',
        children: [
            {
                path: '', component: student_management_dashboard_component_1.StudentManagementDashboardComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            }
        ]
    },
];
exports.StudentManagementDashboardRouting = router_1.RouterModule.forRoot(studentManagementDashboardRoutes);
//# sourceMappingURL=student-management-dashboard.routes.js.map