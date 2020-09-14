"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_leave_list_component_1 = require("./student-management-leave-list/student-management-leave-list.component");
const student_management_leave_add_component_1 = require("./student-management-leave-add/student-management-leave-add.component");
const student_management_leave_edit_detail_component_1 = require("./student-management-leave-edit-detail/student-management-leave-edit-detail.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const studentLeaveManagementRoutes = [
    {
        path: 'student/leavemanagement',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list', component: student_management_leave_list_component_1.ListStudentLeaveManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLeaveManagement, type: 'View' }
            },
            {
                path: 'add', component: student_management_leave_add_component_1.AddStudentLeaveManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLeaveManagement, type: 'Add' }
            },
            {
                path: ':id', component: student_management_leave_edit_detail_component_1.EditAndDetailStudentLeaveManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLeaveManagement, type: 'Edit' }
            }
        ]
    },
];
exports.StudentLeaveManagementRouting = router_1.RouterModule.forRoot(studentLeaveManagementRoutes);
//# sourceMappingURL=student-management-leave.routes.js.map