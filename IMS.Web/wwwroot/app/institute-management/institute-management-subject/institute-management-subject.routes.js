"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const institute_management_subject_list_component_1 = require("./institute-management-subject-list/institute-management-subject-list.component");
const institute_management_subject_add_component_1 = require("./institute-management-subject-add/institute-management-subject-add.component");
const institute_management_subject_edit_details_1 = require("./institute-management-subject-edit-details/institute-management-subject-edit-details");
const subjectManagementRoutes = [
    {
        path: 'institute/subject',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: institute_management_subject_list_component_1.ListSubjectManagementComponent },
            { path: 'add', component: institute_management_subject_add_component_1.AddSubjectManagementComponent },
            { path: ':id', component: institute_management_subject_edit_details_1.EditDetailsSubjectManagementComponent }
        ]
    },
];
exports.SubjectManagementRouting = router_1.RouterModule.forRoot(subjectManagementRoutes);
//# sourceMappingURL=institute-management-subject.routes.js.map