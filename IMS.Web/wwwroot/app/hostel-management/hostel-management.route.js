"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const hostelManagementRoutes = [
    {
        path: 'hostel',
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
];
exports.HostelManagementRouting = router_1.RouterModule.forRoot(hostelManagementRoutes);
//# sourceMappingURL=hostel-management.route.js.map