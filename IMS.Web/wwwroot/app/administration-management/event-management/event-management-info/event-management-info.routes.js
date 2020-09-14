"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const event_management_info_list_component_1 = require("./event-management-info-list/event-management-info-list.component");
const event_management_info_add_component_1 = require("./event-management-info-add/event-management-info-add.component");
const event_management_info_edit_detail_component_1 = require("./event-management-info-edit-detail/event-management-info-edit-detail.component");
const EventManagementRoutes = [
    {
        path: 'administration/event/info',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: event_management_info_list_component_1.ListEventManagementComponent },
            { path: 'add', component: event_management_info_add_component_1.AddEventManagementComponent },
            { path: ':id', component: event_management_info_edit_detail_component_1.EditDetailEventManagementComponent }
        ]
    },
];
exports.EventManagementRouting = router_1.RouterModule.forRoot(EventManagementRoutes);
//# sourceMappingURL=event-management-info.routes.js.map