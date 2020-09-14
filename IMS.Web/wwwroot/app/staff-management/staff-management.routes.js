"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const staffManagementRoutes = [
    {
        path: 'student',
        children: [
            { path: '', redirectTo: 'department', pathMatch: 'full' }
        ]
    },
];
exports.StaffManagementRouting = router_1.RouterModule.forRoot(staffManagementRoutes);
//# sourceMappingURL=staff-management.routes.js.map