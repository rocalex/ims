"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_relieving_list_component_1 = require("./student-management-relieving-list/student-management-relieving-list.component");
const student_management_relieving_add_component_1 = require("./student-management-relieving-add/student-management-relieving-add.component");
const student_management_relieving_edit_detail_component_1 = require("./student-management-relieving-edit-detail/student-management-relieving-edit-detail.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const studentRelievingManagementRoutes = [
    {
        path: 'student/relieving',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list', component: student_management_relieving_list_component_1.ListStudentRelievingManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentRelieving, type: 'View' }
            },
            {
                path: 'add', component: student_management_relieving_add_component_1.AddStudentRelievingManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentRelieving, type: 'Add' }
            },
            {
                path: ':id', component: student_management_relieving_edit_detail_component_1.EditAndDetailStudentRelievingManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentRelieving, type: 'Edit' }
            }
        ]
    },
];
exports.StudentRelievingManagementRouting = router_1.RouterModule.forRoot(studentRelievingManagementRoutes);
//# sourceMappingURL=student-management-relieving.routes.js.map