"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const financeManagementRoutes = [
    {
        path: 'finance',
        children: [
            { path: '', redirectTo: 'receipt', pathMatch: 'full' }
        ]
    },
];
exports.FinanceManagementRouting = router_1.RouterModule.forRoot(financeManagementRoutes);
//# sourceMappingURL=finance-management.routes.js.map