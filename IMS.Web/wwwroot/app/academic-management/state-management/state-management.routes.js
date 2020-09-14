"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const state_management_add_component_1 = require("./state-management-add/state-management-add.component");
const state_management_edit_detail_component_1 = require("./state-management-edit-detail/state-management-edit-detail.component");
const state_management_list_component_1 = require("./state-management-list/state-management-list.component");
const stateManagementRoutes = [
    {
        path: 'academic/state',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: state_management_list_component_1.ListStateManagementComponent },
            { path: 'add', component: state_management_add_component_1.AddStateManagementComponent },
            { path: ':id', component: state_management_edit_detail_component_1.EditAndDetailStateManagementComponent }
        ]
    },
];
exports.StateManagementRouting = router_1.RouterModule.forRoot(stateManagementRoutes);
//# sourceMappingURL=state-management.routes.js.map