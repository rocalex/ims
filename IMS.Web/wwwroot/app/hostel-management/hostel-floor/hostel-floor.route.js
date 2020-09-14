"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const hostel_floor_component_1 = require("./hostel-floor.component");
const detail_component_1 = require("./detail/detail.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const hostelFloorRoutes = [
    {
        path: 'hostel/floors',
        children: [
            {
                path: '',
                component: hostel_floor_component_1.HostelFloorComponent,
                canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            },
            {
                path: ':id',
                children: [
                    {
                        path: ':floor',
                        component: detail_component_1.DetailComponent
                    }
                ]
            }
        ]
    },
];
exports.HostelFloorRouting = router_1.RouterModule.forRoot(hostelFloorRoutes);
//# sourceMappingURL=hostel-floor.route.js.map