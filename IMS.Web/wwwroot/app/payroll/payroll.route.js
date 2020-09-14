"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const payrollManagementRoutes = [
    {
        path: 'payroll',
        children: [
            { path: '', redirectTo: 'componentgroup', pathMatch: 'full' }
        ]
    },
];
exports.PayrollRouting = router_1.RouterModule.forRoot(payrollManagementRoutes);
//# sourceMappingURL=payroll.route.js.map