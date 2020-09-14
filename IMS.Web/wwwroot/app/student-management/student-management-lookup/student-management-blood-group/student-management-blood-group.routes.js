"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_blood_group_list_component_1 = require("./student-management-blood-group-list/student-management-blood-group-list.component");
const student_management_blood_group_add_component_1 = require("./student-management-blood-group-add/student-management-blood-group-add.component");
const student_management_blood_group_edit_detail_component_1 = require("./student-management-blood-group-edit-detail/student-management-blood-group-edit-detail.component");
const BloodGroupManagementRoutes = [
    {
        path: 'student/lookup/bloodgroup',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: student_management_blood_group_list_component_1.ListBloodGroupManagementComponent },
            { path: 'add', component: student_management_blood_group_add_component_1.AddBloodGroupManagementComponent },
            { path: ':id', component: student_management_blood_group_edit_detail_component_1.EditAndDetailBloodGroupManagementComponent }
        ]
    },
];
exports.BloodGroupManagementRouting = router_1.RouterModule.forRoot(BloodGroupManagementRoutes);
//# sourceMappingURL=student-management-blood-group.routes.js.map