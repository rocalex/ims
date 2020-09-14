"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_mother_tongue_list_component_1 = require("./student-management-mother-tongue-list/student-management-mother-tongue-list.component");
const student_management_mother_tongue_add_component_1 = require("./student-management-mother-tongue-add/student-management-mother-tongue-add.component");
const student_management_mother_tongue_edit_details_component_1 = require("./student-management-mother-tongue-edit-details/student-management-mother-tongue-edit-details.component");
const motherTongueManagementRoutes = [
    {
        path: 'student/lookup/mothertongue',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: student_management_mother_tongue_list_component_1.ListMotherTongueManagementComponent },
            { path: 'add', component: student_management_mother_tongue_add_component_1.AddMotherTongueManagementComponent },
            { path: ':id', component: student_management_mother_tongue_edit_details_component_1.EditDetailsMotherTongueManagementComponent }
        ]
    },
];
exports.MotherTongueManagementRouting = router_1.RouterModule.forRoot(motherTongueManagementRoutes);
//# sourceMappingURL=student-management-mother-tongue.routes.js.map