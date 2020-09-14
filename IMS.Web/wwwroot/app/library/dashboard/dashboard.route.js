"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const dashboard_component_1 = require("./dashboard.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const routes = [
    {
        path: 'library/dashboard',
        children: [
            {
                path: '',
                component: dashboard_component_1.DashboardComponent,
                canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            }
        ]
    },
];
exports.DashboardRouting = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=dashboard.route.js.map