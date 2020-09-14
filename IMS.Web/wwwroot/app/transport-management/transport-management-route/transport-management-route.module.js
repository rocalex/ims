"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../../shared/shared.module");
const transport_management_route_routes_1 = require("./transport-management-route.routes");
const transport_management_route_component_1 = require("./transport-management-route.component");
const transport_management_route_service_1 = require("./transport-management-route.service");
const transport_management_route_list_component_1 = require("./transport-management-route-list/transport-management-route-list.component");
const transport_management_route_edit_detail_component_1 = require("./transport-management-route-edit-detail/transport-management-route-edit-detail.component");
const transport_management_route_add_component_1 = require("./transport-management-route-add/transport-management-route-add.component");
let TransportManagementRouteModule = class TransportManagementRouteModule {
};
TransportManagementRouteModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            transport_management_route_routes_1.TransportManagementRouteRouting
        ],
        declarations: [
            transport_management_route_component_1.TransportManagementRouteComponent,
            transport_management_route_list_component_1.ListTransportManagementRouteComponent,
            transport_management_route_edit_detail_component_1.EditAndDetailTransportManagementRouteComponent,
            transport_management_route_add_component_1.AddTransportManagementRouteComponent
        ],
        providers: [
            transport_management_route_service_1.RouteService
        ],
    })
], TransportManagementRouteModule);
exports.TransportManagementRouteModule = TransportManagementRouteModule;
//# sourceMappingURL=transport-management-route.module.js.map