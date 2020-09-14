"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const hostel_swap_component_1 = require("./hostel-swap.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const hostelSwapRoutes = [
    {
        path: 'hostel/vacantroom',
        children: [
            {
                path: '',
                component: hostel_swap_component_1.HostelSwapComponent,
                canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            }
        ]
    },
];
exports.HostelSwapRouting = router_1.RouterModule.forRoot(hostelSwapRoutes);
//# sourceMappingURL=hostel-swap.route.js.map