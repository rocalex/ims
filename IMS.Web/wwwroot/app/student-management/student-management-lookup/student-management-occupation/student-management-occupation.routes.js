"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_occupation_list_component_1 = require("./student-management-occupation-list/student-management-occupation-list.component");
const student_management_occupation_add_component_1 = require("./student-management-occupation-add/student-management-occupation-add.component");
const student_management_occupation_edit_detail_component_1 = require("./student-management-occupation-edit-detail/student-management-occupation-edit-detail.component");
const occupationManagementRoutes = [
    {
        path: 'student/lookup/occupation',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: student_management_occupation_list_component_1.ListOccupationManagementComponent },
            { path: 'add', component: student_management_occupation_add_component_1.AddOccupationManagementComponent },
            { path: ':id', component: student_management_occupation_edit_detail_component_1.EditAndDetailOccupationManagementComponent }
        ]
    },
];
exports.OccupationManagementRouting = router_1.RouterModule.forRoot(occupationManagementRoutes);
//# sourceMappingURL=student-management-occupation.routes.js.map