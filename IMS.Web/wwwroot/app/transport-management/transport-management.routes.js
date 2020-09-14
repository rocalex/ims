"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const transportManagementRoutes = [
    {
        path: 'transportmanagement',
        children: [
            { path: '', redirectTo: 'vehiclemaster', pathMatch: 'full' }
        ]
    },
];
exports.TransportManagementRouting = router_1.RouterModule.forRoot(transportManagementRoutes);
//# sourceMappingURL=transport-management.routes.js.map