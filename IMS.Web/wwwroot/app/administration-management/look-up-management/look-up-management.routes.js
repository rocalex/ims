"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const look_up_management_list_component_1 = require("./look-up-management-list/look-up-management-list.component");
const look_up_management_add_component_1 = require("./look-up-management-add/look-up-management-add.component");
const look_up_management_edit_detail_component_1 = require("./look-up-management-edit-detail/look-up-management-edit-detail.component");
const lookUpManagementRoutes = [
    {
        path: 'administration/lookup',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: look_up_management_list_component_1.ListLookUpManagementComponent },
            { path: 'add', component: look_up_management_add_component_1.AddLookUpManagementComponent },
            { path: ':id', component: look_up_management_edit_detail_component_1.EditAndDetailLookUpManagementComponent }
        ]
    },
];
exports.LookUpManagementRouting = router_1.RouterModule.forRoot(lookUpManagementRoutes);
//# sourceMappingURL=look-up-management.routes.js.map