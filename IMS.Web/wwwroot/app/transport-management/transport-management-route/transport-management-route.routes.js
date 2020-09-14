"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const transport_management_route_list_component_1 = require("./transport-management-route-list/transport-management-route-list.component");
const transport_management_route_edit_detail_component_1 = require("./transport-management-route-edit-detail/transport-management-route-edit-detail.component");
const transport_management_route_add_component_1 = require("./transport-management-route-add/transport-management-route-add.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const transportManagementRouteRoutes = [
    {
        path: 'transportmanagement/route',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list', component: transport_management_route_list_component_1.ListTransportManagementRouteComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportRoute, type: 'View' }
            },
            {
                path: 'add', component: transport_management_route_add_component_1.AddTransportManagementRouteComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportRoute, type: 'Add' }
            },
            {
                path: ':id', component: transport_management_route_edit_detail_component_1.EditAndDetailTransportManagementRouteComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportRoute, type: 'Edit' }
            }
        ]
    },
];
exports.TransportManagementRouteRouting = router_1.RouterModule.forRoot(transportManagementRouteRoutes);
//# sourceMappingURL=transport-management-route.routes.js.map