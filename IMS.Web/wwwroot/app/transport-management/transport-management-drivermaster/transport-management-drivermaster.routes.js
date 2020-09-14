"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const transport_management_drivermaster_list_component_1 = require("./transport-management-drivermaster-list/transport-management-drivermaster-list.component");
const transport_management_drivermaster_edit_detail_component_1 = require("./transport-management-drivermaster-edit-detail/transport-management-drivermaster-edit-detail.component");
const transport_management_drivermaster_add_component_1 = require("./transport-management-drivermaster-add/transport-management-drivermaster-add.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const transportManagementDriverMasterRoutes = [
    {
        path: 'transportmanagement/drivermaster',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list', component: transport_management_drivermaster_list_component_1.ListTransportManagementDriverMasterComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportDriver, type: 'View' }
            },
            {
                path: 'add', component: transport_management_drivermaster_add_component_1.AddTransportManagementDriverMasterComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportDriver, type: 'Add' }
            },
            {
                path: ':id', component: transport_management_drivermaster_edit_detail_component_1.EditAndDetailTransportManagementDriverMasterComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportDriver, type: 'Edit' }
            }
        ]
    },
];
exports.TransportManagementDriverMasterRouting = router_1.RouterModule.forRoot(transportManagementDriverMasterRoutes);
//# sourceMappingURL=transport-management-drivermaster.routes.js.map