"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const transport_management_vehiclemaintenance_component_1 = require("./transport-management-vehiclemaintenance.component");
const transport_management_maintenance_list_component_1 = require("./transport-management-maintenance/transport-management-maintenance-list/transport-management-maintenance-list.component");
const transport_management_maintenance_add_component_1 = require("./transport-management-maintenance/transport-management-maintenance-add/transport-management-maintenance-add.component");
const transport_management_maintenance_edit_component_1 = require("./transport-management-maintenance/transport-management-maintenance-edit-detail/transport-management-maintenance-edit.component");
const transport_management_repair_list_component_1 = require("./transport-management-repair/transport-management-repair-list/transport-management-repair-list.component");
const transport_management_repair_add_component_1 = require("./transport-management-repair/transport-management-repair-add/transport-management-repair-add.component");
const transport_management_repair_edit_component_1 = require("./transport-management-repair/transport-management-repair-edit-detail/transport-management-repair-edit.component");
const transport_management_accident_list_component_1 = require("./transport-management-accident/transport-management-accident-list/transport-management-accident-list.component");
const transport_management_accident_add_component_1 = require("./transport-management-accident/transport-management-accident-add/transport-management-accident-add.component");
const transport_management_accident_edit_component_1 = require("./transport-management-accident/transport-management-accident-edit-detail/transport-management-accident-edit.component");
const transport_management_breakdown_list_component_1 = require("./transport-management-breakdown/transport-management-breakdown-list/transport-management-breakdown-list.component");
const transport_management_breakdown_add_component_1 = require("./transport-management-breakdown/transport-management-breakdown-add/transport-management-breakdown-add.component");
const transport_management_breakdown_edit_component_1 = require("./transport-management-breakdown/transport-management-breakdown-edit-detail/transport-management-breakdown-edit.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const transportManagementVehicleMaintenanceRoutes = [
    {
        path: 'transportmanagement/vehiclemaintenance', component: transport_management_vehiclemaintenance_component_1.TransportManagementVehicleMaintenanceComponent,
        children: [
            {
                path: 'maintenance',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: transport_management_maintenance_list_component_1.ListTransportManagementMaintenanceComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicleMaintanence, type: 'View' }
                    },
                    {
                        path: 'add', component: transport_management_maintenance_add_component_1.AddTransportManagementMaintenanceComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicleMaintanence, type: 'Add' }
                    },
                    {
                        path: ':id', component: transport_management_maintenance_edit_component_1.EditAndDetailTransportManagementMaintenanceComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicleMaintanence, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'repair',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: transport_management_repair_list_component_1.ListTransportManagementRepairComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicleRepair, type: 'View' }
                    },
                    {
                        path: 'add', component: transport_management_repair_add_component_1.AddTransportManagementRepairComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicleRepair, type: 'Add' }
                    },
                    {
                        path: ':id', component: transport_management_repair_edit_component_1.EditAndDetailTransportManagementRepairComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicleRepair, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'accident',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: transport_management_accident_list_component_1.ListTransportManagementAccidentComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicleAccident, type: 'View' }
                    },
                    {
                        path: 'add', component: transport_management_accident_add_component_1.AddTransportManagementAccidentComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicleAccident, type: 'Add' }
                    },
                    {
                        path: ':id', component: transport_management_accident_edit_component_1.EditAndDetailTransportManagementAccidentComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicleAccident, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'breakdown',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: transport_management_breakdown_list_component_1.ListTransportManagementBreakDownComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicleBreakDown, type: 'View' }
                    },
                    {
                        path: 'add', component: transport_management_breakdown_add_component_1.AddTransportManagementBreakDownComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicleBreakDown, type: 'Add' }
                    },
                    {
                        path: ':id', component: transport_management_breakdown_edit_component_1.EditAndDetailTransportManagementBreakDownComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicleBreakDown, type: 'Edit' }
                    }
                ]
            }
        ]
    },
];
exports.TransportManagementVehicleMaintenanceRouting = router_1.RouterModule.forRoot(transportManagementVehicleMaintenanceRoutes);
//# sourceMappingURL=transport-management-vehiclemaintenance.routes.js.map