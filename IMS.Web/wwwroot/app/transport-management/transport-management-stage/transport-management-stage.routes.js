"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const transport_management_stage_list_component_1 = require("./transport-management-stage-list/transport-management-stage-list.component");
const transport_management_stage_edit_detail_component_1 = require("./transport-management-stage-edit-detail/transport-management-stage-edit-detail.component");
const transport_management_stage_add_component_1 = require("./transport-management-stage-add/transport-management-stage-add.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const transportManagementStageRoutes = [
    {
        path: 'transportmanagement/stage',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list', component: transport_management_stage_list_component_1.ListTransportManagementStageComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportStage, type: 'View' }
            },
            {
                path: 'add', component: transport_management_stage_add_component_1.AddTransportManagementStageComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportStage, type: 'Add' }
            },
            {
                path: ':id', component: transport_management_stage_edit_detail_component_1.EditAndDetailTransportManagementStageComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Transportation, child: sidenav_model_1.UserGroupFeatureChildEnum.TransportStage, type: 'Edit' }
            }
        ]
    },
];
exports.TransportManagementStageRouting = router_1.RouterModule.forRoot(transportManagementStageRoutes);
//# sourceMappingURL=transport-management-stage.routes.js.map