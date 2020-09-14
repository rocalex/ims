"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_information_list_component_1 = require("./student-management-information-list/student-management-information-list.component");
const student_management_information_add_component_1 = require("./student-management-information-add/student-management-information-add.component");
const student_management_information_edit_detail_component_1 = require("./student-management-information-edit-detail/student-management-information-edit-detail.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const classlist_component_1 = require("./student-class-list/classlist.component");
const studentInformationManagementRoutes = [
    {
        path: 'student/information',
        children: [
            { path: '', redirectTo: 'classlist', pathMatch: 'full' },
            { path: 'classlist', component: classlist_component_1.ClassListComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentInfo, type: 'View' }
            },
            {
                path: 'list',
                children: [
                    { path: ':id', component: student_management_information_list_component_1.ListStudentInformationManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentInfo, type: 'View' }
                    }
                ]
            },
            {
                path: 'add', component: student_management_information_add_component_1.AddStudentInformationManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentInfo, type: 'Add' }
            },
            {
                path: ':id', component: student_management_information_edit_detail_component_1.EditAndDetailStudentInformationManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentInfo, type: 'Edit' }
            }
        ]
    },
];
exports.StudentInformationManagementRouting = router_1.RouterModule.forRoot(studentInformationManagementRoutes);
//# sourceMappingURL=student-management-information.routes.js.map