"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const payslip_component_1 = require("./payslip.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const routes = [
    {
        path: 'payroll/downloadpayslips',
        children: [
            {
                path: '',
                component: payslip_component_1.PayslipComponent,
                canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            }
        ]
    },
];
exports.PayslipRouting = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=payslip.route.js.map