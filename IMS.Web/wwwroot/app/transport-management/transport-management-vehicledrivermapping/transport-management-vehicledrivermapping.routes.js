"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const transport_management_vehicledrivermapping_list_component_1 = require("./transport-management-vehicledrivermapping-list/transport-management-vehicledrivermapping-list.component");
const transport_management_vehicledrivermapping_edit_detail_component_1 = require("./transport-management-vehicledrivermapping-edit-detail/transport-management-vehicledrivermapping-edit-detail.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const transportManagementVehicleDriverMappingRoutes = [
    {
        path: 'transportmanagement/vehicledrivermapping',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list', component: transport_management_vehicledrivermapping_list_component_1.ListTransportManagementVehicleDriverMappingComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicleDriverMapping, type: 'View' }
            },
            {
                path: ':id', component: transport_management_vehicledrivermapping_edit_detail_component_1.EditAndDetailTransportManagementVehicleDriverMappingComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicleDriverMapping, type: 'Edit' }
            }
        ]
    },
];
exports.TransportManagementVehicleDriverMappingRouting = router_1.RouterModule.forRoot(transportManagementVehicleDriverMappingRoutes);
//# sourceMappingURL=transport-management-vehicledrivermapping.routes.js.map