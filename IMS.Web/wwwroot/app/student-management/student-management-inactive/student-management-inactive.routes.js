"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_inactive_component_1 = require("./student-management-inactive.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const studentManagementInActiveRoutes = [
    {
        path: 'student/inactive',
        children: [
            {
                path: '', component: student_management_inactive_component_1.StudentManagementInActiveComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentInActive, type: 'View' }
            }
        ]
    },
];
exports.StudentManagementInActiveRouting = router_1.RouterModule.forRoot(studentManagementInActiveRoutes);
//# sourceMappingURL=student-management-inactive.routes.js.map