"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const event_management_component_1 = require("./event-management.component");
// Event Info Management
const event_management_info_list_component_1 = require("./event-management-info/event-management-info-list/event-management-info-list.component");
const event_management_info_add_component_1 = require("./event-management-info/event-management-info-add/event-management-info-add.component");
const event_management_info_edit_detail_component_1 = require("./event-management-info/event-management-info-edit-detail/event-management-info-edit-detail.component");
// Event Report
const event_management_report_component_1 = require("./event-management-report/event-management-report.component");
const eventManagementRoutes = [
    {
        path: 'administration/event', component: event_management_component_1.EventManagementComponent,
        children: [
            {
                path: 'info',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: event_management_info_list_component_1.ListEventManagementComponent },
                    { path: 'add', component: event_management_info_add_component_1.AddEventManagementComponent },
                    { path: ':id', component: event_management_info_edit_detail_component_1.EditDetailEventManagementComponent }
                ]
            },
            {
                path: 'report',
                children: [
                    { path: '', component: event_management_report_component_1.EventManagementReportComponent }
                ]
            }
        ]
    },
];
exports.EventManagementRoutes = router_1.RouterModule.forRoot(eventManagementRoutes);
//# sourceMappingURL=event-management.routes.js.map