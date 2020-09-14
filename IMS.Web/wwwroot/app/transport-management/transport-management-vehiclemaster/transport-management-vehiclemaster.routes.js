"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const transport_management_vehiclemaster_list_component_1 = require("./transport-management-vehiclemaster-list/transport-management-vehiclemaster-list.component");
const transport_management_vehiclemaster_edit_detail_component_1 = require("./transport-management-vehiclemaster-edit-detail/transport-management-vehiclemaster-edit-detail.component");
const transport_management_vehiclemaster_add_component_1 = require("./transport-management-vehiclemaster-add/transport-management-vehiclemaster-add.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const transportManagementVehicleMasterRoutes = [
    {
        path: 'transportmanagement/vehiclemaster',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list', component: transport_management_vehiclemaster_list_component_1.ListTransportManagementVehicleMasterComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicle, type: 'View' }
            },
            {
                path: 'add', component: transport_management_vehiclemaster_add_component_1.AddTransportManagementVehicleMasterComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicle, type: 'Add' }
            },
            {
                path: ':id', component: transport_management_vehiclemaster_edit_detail_component_1.EditAndDetailTransportManagementVehicleMasterComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicle, type: 'Edit' }
            }
        ]
    },
];
exports.TransportManagementVehicleMasterRouting = router_1.RouterModule.forRoot(transportManagementVehicleMasterRoutes);
//# sourceMappingURL=transport-management-vehiclemaster.routes.js.map