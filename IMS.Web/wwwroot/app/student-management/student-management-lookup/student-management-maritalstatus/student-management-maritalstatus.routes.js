"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_maritalstatus_list_component_1 = require("./student-management-maritalstatus-list/student-management-maritalstatus-list.component");
const student_management_maritalstatus_add_component_1 = require("./student-management-maritalstatus-add/student-management-maritalstatus-add.component");
const student_management_maritalstatus_edit_detail_component_1 = require("./student-management-maritalstatus-edit-detail/student-management-maritalstatus-edit-detail.component");
const MaritalStatusManagementRoutes = [
    {
        path: 'student/lookup/maritalstatus',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: student_management_maritalstatus_list_component_1.ListMaritalStatusManagementComponent },
            { path: 'add', component: student_management_maritalstatus_add_component_1.AddMaritalStatusManagementComponent },
            { path: ':id', component: student_management_maritalstatus_edit_detail_component_1.EditAndDetailMaritalStatusManagementComponent }
        ]
    },
];
exports.MaritalStatusManagementRouting = router_1.RouterModule.forRoot(MaritalStatusManagementRoutes);
//# sourceMappingURL=student-management-maritalstatus.routes.js.map