"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_examdefinition_list_component_1 = require("./student-management-examdefinition/student-management-examdefinition-list/student-management-examdefinition-list.component");
const student_management_examdefinition_add_component_1 = require("./student-management-examdefinition/student-management-examdefinition-add/student-management-examdefinition-add.component");
const student_management_examdefinition_edit_detail_component_1 = require("./student-management-examdefinition/student-management-examdefinition-edit-detail/student-management-examdefinition-edit-detail.component");
const student_management_mark_component_1 = require("./student-management-mark.component");
const student_management_classexam_add_component_1 = require("./student-management-classexam/student-management-classexam-add/student-management-classexam-add.component");
const student_management_classexam_edit_detail_component_1 = require("./student-management-classexam/student-management-classexam-edit-detail/student-management-classexam-edit-detail.component");
const student_management_classexam_list_component_1 = require("./student-management-classexam/student-management-classexam-list/student-management-classexam-list.component");
const student_management_mark_examscoreentry_component_1 = require("./student-management-mark-examscoreentry/student-management-mark-examscoreentry.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const studentManagementMarkRoutes = [
    {
        path: 'student/mark', component: student_management_mark_component_1.StudentManagementMarkComponent,
        children: [
            {
                path: 'examdefinition',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_examdefinition_list_component_1.ListStudentManagementExamDefinitionComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentMarkExamDefinition, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_examdefinition_add_component_1.AddStudentManagementExamDefinitionComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentMarkExamDefinition, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_examdefinition_edit_detail_component_1.EditAndDetailStudentManagementExamDefinitionComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentMarkExamDefinition, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'classexam',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_classexam_list_component_1.ListStudentManagementClassExamComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentMarkClassExam, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_classexam_add_component_1.AddStudentManagementClassExamComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_classexam_edit_detail_component_1.EditAndDetailStudentManagementClassExamComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'examscoreentry',
                children: [
                    {
                        path: '', component: student_management_mark_examscoreentry_component_1.StudentManagementExamScoreEntryComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentMarkExamScoreEntry, type: 'View' }
                    },
                ]
            }
        ]
    }
];
exports.StudentManagementMarkRoutes = router_1.RouterModule.forRoot(studentManagementMarkRoutes);
//# sourceMappingURL=student-management-mark.routes.js.map