"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_qualification_list_component_1 = require("./student-management-qualification-list/student-management-qualification-list.component");
const student_management_qualification_add_component_1 = require("./student-management-qualification-add/student-management-qualification-add.component");
const student_management_qualification_edit_detail_component_1 = require("./student-management-qualification-edit-detail/student-management-qualification-edit-detail.component");
const qualificationManagementRoutes = [
    {
        path: 'student/lookup/qualification',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: student_management_qualification_list_component_1.ListQualificationManagementComponent },
            { path: 'add', component: student_management_qualification_add_component_1.AddQualificationManagementComponent },
            { path: ':id', component: student_management_qualification_edit_detail_component_1.EditAndDetailQualificationManagementComponent }
        ]
    },
];
exports.QualificationManagementRouting = router_1.RouterModule.forRoot(qualificationManagementRoutes);
//# sourceMappingURL=student-management-qualification.routes.js.map