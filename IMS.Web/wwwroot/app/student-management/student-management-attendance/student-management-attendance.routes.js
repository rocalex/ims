"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_attendance_component_1 = require("./student-management-attendance.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const studentAttendanceManagementRoutes = [
    {
        path: 'student/attendance',
        children: [
            {
                path: '', component: student_management_attendance_component_1.StudentAttendanceManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentAttendance, type: 'View' }
            }
        ]
    },
];
exports.StudentAttendanceManagementRouting = router_1.RouterModule.forRoot(studentAttendanceManagementRoutes);
//# sourceMappingURL=student-management-attendance.routes.js.map