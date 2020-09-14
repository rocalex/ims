"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const user_group_management_list_component_1 = require("./user-group-management-list/user-group-management-list.component");
const user_group_management_add_component_1 = require("./user-group-management-add/user-group-management-add.component");
const user_group_management_edit_details_component_1 = require("./user-group-management-edit-details/user-group-management-edit-details.component");
const userGroupManagementRoutes = [
    {
        path: 'usermanagement/role',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: user_group_management_list_component_1.UserGroupManagementListComponent },
            { path: 'add', component: user_group_management_add_component_1.UserGroupManagementAddComponent },
            { path: ':id', component: user_group_management_edit_details_component_1.UserGroupManagementEditDetailsComponent }
        ]
    },
];
exports.UserGroupManagementRouting = router_1.RouterModule.forRoot(userGroupManagementRoutes);
//# sourceMappingURL=user-group-management.routes.js.map