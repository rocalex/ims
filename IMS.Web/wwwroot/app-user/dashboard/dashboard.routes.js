"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const dashboard_component_1 = require("./dashboard.component");
const dashboardRoutes = [
    { path: 'dashboard', component: dashboard_component_1.AppUserDashboardComponent },
];
exports.DashboardRoutes = router_1.RouterModule.forRoot(dashboardRoutes);
//# sourceMappingURL=dashboard.routes.js.map