"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const admin_dashboard_component_1 = require("./admin-dashboard.component");
const adminDashboardManagementRoutes = [
    { path: 'dashboard', component: admin_dashboard_component_1.AdminDashboardComponent },
];
exports.AdminDashboardManagementRouting = router_1.RouterModule.forRoot(adminDashboardManagementRoutes);
//# sourceMappingURL=admin-dashboard.routes.js.map