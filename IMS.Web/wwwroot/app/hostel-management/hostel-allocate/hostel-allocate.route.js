"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const hostel_allocate_component_1 = require("./hostel-allocate.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const hostelAllocateRoutes = [
    {
        path: 'hostel/allocateroom',
        children: [
            {
                path: '',
                component: hostel_allocate_component_1.HostelAllocateComponent,
                canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            }
        ]
    },
];
exports.HostelAllocateRouting = router_1.RouterModule.forRoot(hostelAllocateRoutes);
//# sourceMappingURL=hostel-allocate.route.js.map