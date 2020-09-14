"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const institute_management_list_component_1 = require("./institute-management-list/institute-management-list.component");
const institute_management_add_component_1 = require("./institute-management-add/institute-management-add.component");
const institute_management_edit_component_1 = require("./institute-management-edit/institute-management-edit.component");
const instituteManagementRoutes = [
    {
        path: 'institute',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: institute_management_list_component_1.InstituteManagementListComponent },
            { path: 'add', component: institute_management_add_component_1.InstituteManagementAddComponent },
            { path: ':id', component: institute_management_edit_component_1.InstituteManagementEditComponent }
        ]
    },
];
exports.InstituteManagementRouting = router_1.RouterModule.forRoot(instituteManagementRoutes);
//# sourceMappingURL=institute-management.routes.js.map