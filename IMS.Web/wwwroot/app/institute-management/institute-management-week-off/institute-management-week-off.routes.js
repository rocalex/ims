"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
// Components
const institute_management_week_off_list_edit_component_1 = require("./institute-management-week-off-list-edit/institute-management-week-off-list-edit.component");
const weekOffManagementRoutes = [
    {
        path: 'institute/weekoff',
        children: [
            { path: '', component: institute_management_week_off_list_edit_component_1.ListEditWeekOffManagementComponent }
        ]
    },
];
exports.WeekOffManagementRouting = router_1.RouterModule.forRoot(weekOffManagementRoutes);
//# sourceMappingURL=institute-management-week-off.routes.js.map