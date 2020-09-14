"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_leave_list_component_1 = require("./student-management-leave-list/student-management-leave-list.component");
const student_management_leave_add_component_1 = require("./student-management-leave-add/student-management-leave-add.component");
const student_management_leave_edit_detail_component_1 = require("./student-management-leave-edit-detail/student-management-leave-edit-detail.component");
const studentLeaveManagementRoutes = [
    {
        path: 'leave',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: student_management_leave_list_component_1.ListStudentLeaveManagementComponent },
            { path: 'add', component: student_management_leave_add_component_1.AddStudentLeaveManagementComponent },
            { path: ':id', component: student_management_leave_edit_detail_component_1.EditAndDetailStudentLeaveManagementComponent }
        ]
    },
];
exports.StudentLeaveManagementRouting = router_1.RouterModule.forRoot(studentLeaveManagementRoutes);
//# sourceMappingURL=student-management-leave.routes.js.map