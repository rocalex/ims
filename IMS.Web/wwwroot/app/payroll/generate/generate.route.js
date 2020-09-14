"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const generate_component_1 = require("./generate.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const routes = [
    {
        path: 'payroll/genpayroll',
        children: [
            {
                path: '',
                component: generate_component_1.GenerateComponent,
                canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            }
        ]
    },
];
exports.GenerateRouting = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=generate.route.js.map