"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
// Components
const institute_management_holiday_off_list_component_1 = require("./institute-management-holiday-off-list/institute-management-holiday-off-list.component");
const institute_management_holiday_off_add_component_1 = require("./institute-management-holiday-off-add/institute-management-holiday-off-add.component");
const institute_management_holiday_off_edit_details_component_1 = require("./institute-management-holiday-off-edit-details/institute-management-holiday-off-edit-details.component");
const holidayOffManagementRoutes = [
    {
        path: 'institute/holiday',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: institute_management_holiday_off_list_component_1.ListHolidayOffManagementComponent },
            { path: 'list/:academicyearid', component: institute_management_holiday_off_list_component_1.ListHolidayOffManagementComponent },
            { path: 'add/:academicyearid', component: institute_management_holiday_off_add_component_1.AddHolidayOffManagementComponent },
            { path: ':id', component: institute_management_holiday_off_edit_details_component_1.EditDetailsHolidayOffManagementComponent }
        ]
    },
];
exports.HolidayOffManagementRouting = router_1.RouterModule.forRoot(holidayOffManagementRoutes);
//# sourceMappingURL=institute-management-holiday-off.routes.js.map