"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const staff_management_attendance_component_1 = require("./staff-management-attendance.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const staffAttendanceManagementRoutes = [
    {
        path: 'staff/attendance',
        children: [
            {
                path: '', component: staff_management_attendance_component_1.StaffAttendanceManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffAttendance, type: 'View' }
            }
        ]
    },
];
exports.StaffAttendanceManagementRouting = router_1.RouterModule.forRoot(staffAttendanceManagementRoutes);
//# sourceMappingURL=staff-management-attendance.routes.js.map