"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const staff_management_leave_list_component_1 = require("./staff-management-leave-list/staff-management-leave-list.component");
const staff_management_leave_add_component_1 = require("./staff-management-leave-add/staff-management-leave-add.component");
const staff_management_leave_edit_detail_component_1 = require("./staff-management-leave-edit-detail/staff-management-leave-edit-detail.component");
const staffLeaveManagementRoutes = [
    {
        path: 'leavemanagement',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: staff_management_leave_list_component_1.ListStaffLeaveManagementComponent },
            { path: 'add', component: staff_management_leave_add_component_1.AddStaffLeaveManagementComponent },
            { path: ':id', component: staff_management_leave_edit_detail_component_1.EditAndDetailStaffLeaveManagementComponent }
        ]
    },
];
exports.StaffLeaveManagementRouting = router_1.RouterModule.forRoot(staffLeaveManagementRoutes);
//# sourceMappingURL=staff-management-leave.routes.js.map