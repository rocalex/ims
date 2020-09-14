"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const hostel_block_add_component_1 = require("./hostel-block-add/hostel-block-add.component");
const hostel_block_list_component_1 = require("./hostel-block-list/hostel-block-list.component");
const edit_component_1 = require("./edit/edit.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const hostelBlockRoutes = [
    {
        path: 'hostel/blocks',
        children: [
            {
                path: '',
                component: hostel_block_list_component_1.HostelBlockListComponent,
                canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            },
            {
                path: 'add',
                component: hostel_block_add_component_1.HostelBlockAddComponent,
                canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            },
            {
                path: ':id',
                component: edit_component_1.EditComponent,
                canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            }
        ]
    },
];
exports.HostelBlockRouting = router_1.RouterModule.forRoot(hostelBlockRoutes);
//# sourceMappingURL=hostel-block.route.js.map