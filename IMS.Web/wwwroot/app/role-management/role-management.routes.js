"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const role_management_list_component_1 = require("./role-management-list/role-management-list.component");
const role_management_add_component_1 = require("./role-management-add/role-management-add.component");
const roleManagementRoutes = [
    {
        path: 'role',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: role_management_list_component_1.RoleManagementListComponent },
            { path: 'add', component: role_management_add_component_1.RoleManagementAddComponent }
        ]
    },
];
exports.RoleManagementRouting = router_1.RouterModule.forRoot(roleManagementRoutes);
//# sourceMappingURL=role-management.routes.js.map