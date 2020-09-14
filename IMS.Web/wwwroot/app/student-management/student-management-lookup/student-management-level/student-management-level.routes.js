"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_level_list_component_1 = require("./student-management-level-list/student-management-level-list.component");
const student_management_level_add_component_1 = require("./student-management-level-add/student-management-level-add.component");
const student_management_level_edit_detail_component_1 = require("./student-management-level-edit-detail/student-management-level-edit-detail.component");
const levelManagementRoutes = [
    {
        path: 'student/lookup/level',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: student_management_level_list_component_1.ListLevelManagementComponent },
            { path: 'add', component: student_management_level_add_component_1.AddLevelManagementComponent },
            { path: ':id', component: student_management_level_edit_detail_component_1.EditAndDetailLevelManagementComponent }
        ]
    },
];
exports.LevelManagementRouting = router_1.RouterModule.forRoot(levelManagementRoutes);
//# sourceMappingURL=student-management-level.routes.js.map