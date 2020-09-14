"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const staff_management_disciplinary_list_component_1 = require("./staff-management-disciplinary-list/staff-management-disciplinary-list.component");
const staff_management_disciplinary_add_component_1 = require("./staff-management-disciplinary-add/staff-management-disciplinary-add.component");
const staff_management_disciplinary_edit_component_1 = require("./staff-management-disciplinary-edit-detail/staff-management-disciplinary-edit.component");
const disciplinaryRoutes = [
    {
        path: 'disciplinary',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: staff_management_disciplinary_list_component_1.ListStaffDisciplinaryManagementComponent },
            { path: 'add', component: staff_management_disciplinary_add_component_1.AddStaffDisciplinaryManagementComponent },
            { path: ':id', component: staff_management_disciplinary_edit_component_1.EditAndDetailStaffDisciplinaryManagementComponent }
        ]
    }
];
exports.DisciplinaryRoutes = router_1.RouterModule.forRoot(disciplinaryRoutes);
//# sourceMappingURL=staff-management-disciplinary.routes.js.map