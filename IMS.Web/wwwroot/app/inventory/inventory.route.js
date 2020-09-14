"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const routes = [
    {
        path: 'inventory',
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
];
exports.InventoryRouting = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=inventory.route.js.map