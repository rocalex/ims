"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_caste_list_component_1 = require("./student-management-caste-list/student-management-caste-list.component");
const student_management_caste_add_component_1 = require("./student-management-caste-add/student-management-caste-add.component");
const student_management_caste_edit_detail_component_1 = require("./student-management-caste-edit-detail/student-management-caste-edit-detail.component");
const casteManagementRoutes = [
    {
        path: 'student/lookup/caste',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: student_management_caste_list_component_1.ListCasteManagementComponent },
            { path: 'add', component: student_management_caste_add_component_1.AddCasteManagementComponent },
            { path: ':id', component: student_management_caste_edit_detail_component_1.EditAndDetailCasteManagementComponent }
        ]
    },
];
exports.CasteManagementRouting = router_1.RouterModule.forRoot(casteManagementRoutes);
//# sourceMappingURL=student-management-caste.routes.js.map