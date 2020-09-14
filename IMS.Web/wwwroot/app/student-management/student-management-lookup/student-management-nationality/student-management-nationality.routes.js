"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_nationality_list_component_1 = require("./student-management-nationality-list/student-management-nationality-list.component");
const student_management_nationality_add_component_1 = require("./student-management-nationality-add/student-management-nationality-add.component");
const student_management_nationality_edit_detail_component_1 = require("./student-management-nationality-edit-detail/student-management-nationality-edit-detail.component");
const nationalityManagementRoutes = [
    {
        path: 'student/lookup/nationality',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: student_management_nationality_list_component_1.ListNationalityManagementComponent },
            { path: 'add', component: student_management_nationality_add_component_1.AddNationalityManagementComponent },
            { path: ':id', component: student_management_nationality_edit_detail_component_1.EditAndDetailNationalityManagementComponent }
        ]
    },
];
exports.NationalityManagementRouting = router_1.RouterModule.forRoot(nationalityManagementRoutes);
//# sourceMappingURL=student-management-nationality.routes.js.map