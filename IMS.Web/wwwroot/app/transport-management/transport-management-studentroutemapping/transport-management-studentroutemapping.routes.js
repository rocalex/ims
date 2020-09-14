"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const transport_management_studentroutemapping_list_component_1 = require("./transport-management-studentroutemapping-list/transport-management-studentroutemapping-list.component");
const transport_management_studentroutemapping_edit_detail_component_1 = require("./transport-management-studentroutemapping-edit-detail/transport-management-studentroutemapping-edit-detail.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const transportManagementStudentRouteMappingRoutes = [
    {
        path: 'transportmanagement/studentroutemapping',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list', component: transport_management_studentroutemapping_list_component_1.ListTransportManagementStudentRouteMappingComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportStudentRouteMapping, type: 'View' }
            },
            {
                path: ':id', component: transport_management_studentroutemapping_edit_detail_component_1.EditAndDetailTransportManagementStudentRouteMappingComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportStudentRouteMapping, type: 'Edit' }
            }
        ]
    },
];
exports.TransportManagementStudentRouteMappingRouting = router_1.RouterModule.forRoot(transportManagementStudentRouteMappingRoutes);
//# sourceMappingURL=transport-management-studentroutemapping.routes.js.map