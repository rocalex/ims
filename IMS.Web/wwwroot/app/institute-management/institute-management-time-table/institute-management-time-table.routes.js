"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
// Components
const institute_management_time_table_component_1 = require("./institute-management-time-table.component");
const institute_management_time_table_generate_component_1 = require("./institute-management-time-table-generate/institute-management-time-table-generate.component");
const timeTableManagementRoutes = [
    {
        path: 'institute/timetable',
        children: [
            { path: '', component: institute_management_time_table_component_1.TimeTableManagementComponent },
            { path: 'generate/:classId/:sectionId', component: institute_management_time_table_generate_component_1.GenerateTimeTableManagementComponent }
        ]
    },
];
exports.TimeTableManagementRouting = router_1.RouterModule.forRoot(timeTableManagementRoutes);
//# sourceMappingURL=institute-management-time-table.routes.js.map