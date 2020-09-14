"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const timesheets_component_1 = require("./timesheets.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const routes = [
    {
        path: 'payroll/timesheets',
        children: [
            {
                path: '',
                component: timesheets_component_1.TimesheetsComponent,
                canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            }
        ]
    },
];
exports.TimesheetsRouting = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=timesheets.route.js.map