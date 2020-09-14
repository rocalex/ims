"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_gender_list_component_1 = require("./student-management-gender-list/student-management-gender-list.component");
const student_management_gender_add_component_1 = require("./student-management-gender-add/student-management-gender-add.component");
const student_management_gender_edit_detail_component_1 = require("./student-management-gender-edit-detail/student-management-gender-edit-detail.component");
const genderManagementRoutes = [
    {
        path: 'student/lookup/gender',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: student_management_gender_list_component_1.ListGenderManagementComponent },
            { path: 'add', component: student_management_gender_add_component_1.AddGenderManagementComponent },
            { path: ':id', component: student_management_gender_edit_detail_component_1.EditAndDetailGenderManagementComponent }
        ]
    },
];
exports.GenderManagementRouting = router_1.RouterModule.forRoot(genderManagementRoutes);
//# sourceMappingURL=student-management-gender.routes.js.map