"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const staff_management_activity_list_component_1 = require("./staff-management-activity-list/staff-management-activity-list.component");
const staff_management_activity_add_component_1 = require("./staff-management-activity-add/staff-management-activity-add.component");
const staff_management_activity_edit_details_component_1 = require("./staff-management-activity-edit-details/staff-management-activity-edit-details.component");
const staffActivityManagementRoutes = [
    {
        path: 'staff/activity',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: staff_management_activity_list_component_1.ListStaffActivityManagementComponent },
            { path: 'add', component: staff_management_activity_add_component_1.AddStaffActivityManagementComponent },
            { path: ':id', component: staff_management_activity_edit_details_component_1.EditDetailsStaffActivityManagementComponent }
        ]
    },
];
exports.StaffActivityManagementRouting = router_1.RouterModule.forRoot(staffActivityManagementRoutes);
//# sourceMappingURL=staff-management-activity.routes.js.map