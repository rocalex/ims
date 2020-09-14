"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const hostel_beds_component_1 = require("./hostel-beds.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const hostelBedsRoutes = [
    {
        path: 'hostel/bedinfo',
        children: [
            {
                path: '',
                component: hostel_beds_component_1.HostelBedsComponent,
                canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            }
        ]
    },
];
exports.HostelBedsRouting = router_1.RouterModule.forRoot(hostelBedsRoutes);
//# sourceMappingURL=hostel-beds.route.js.map