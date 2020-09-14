"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_religion_list_component_1 = require("./student-management-religion-list/student-management-religion-list.component");
const student_management_religion_add_component_1 = require("./student-management-religion-add/student-management-religion-add.component");
const student_management_religion_edit_detail_component_1 = require("./student-management-religion-edit-detail/student-management-religion-edit-detail.component");
const religionManagementRoutes = [
    {
        path: 'student/lookup/religion',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: student_management_religion_list_component_1.ListReligionManagementComponent },
            { path: 'add', component: student_management_religion_add_component_1.AddReligionManagementComponent },
            { path: ':id', component: student_management_religion_edit_detail_component_1.EditAndDetailReligionManagementComponent }
        ]
    },
];
exports.ReligionManagementRouting = router_1.RouterModule.forRoot(religionManagementRoutes);
//# sourceMappingURL=student-management-religion.routes.js.map