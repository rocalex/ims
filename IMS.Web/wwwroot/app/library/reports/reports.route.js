"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const reports_component_1 = require("./reports.component");
const bookwise_component_1 = require("./bookwise/bookwise.component");
const userwise_component_1 = require("./userwise/userwise.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const routes = [
    {
        path: 'library/reports',
        children: [
            {
                path: '',
                component: reports_component_1.ReportsComponent,
                canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            },
            {
                path: 'bookwise',
                component: bookwise_component_1.BookWiseComponent,
                canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            },
            {
                path: 'userwise',
                component: userwise_component_1.UserWiseComponent,
                canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            },
        ]
    },
];
exports.ReportRouting = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=reports.route.js.map