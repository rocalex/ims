"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../shared/shared.module");
const transport_management_component_1 = require("./transport-management.component");
const transport_management_routes_1 = require("./transport-management.routes");
const transport_management_vehiclemaster_module_1 = require("./transport-management-vehiclemaster/transport-management-vehiclemaster.module");
const transport_management_drivermaster_module_1 = require("./transport-management-drivermaster/transport-management-drivermaster.module");
const transport_management_stage_module_1 = require("./transport-management-stage/transport-management-stage.module");
const transport_management_route_module_1 = require("./transport-management-route/transport-management-route.module");
const transport_management_studentroutemapping_module_1 = require("./transport-management-studentroutemapping/transport-management-studentroutemapping.module");
const transport_management_vehiclemaintenance_module_1 = require("./transport-management-vehiclemaintenance/transport-management-vehiclemaintenance.module");
const transport_management_vehicledrivermapping_module_1 = require("./transport-management-vehicledrivermapping/transport-management-vehicledrivermapping.module");
let TransportManagementModule = class TransportManagementModule {
};
TransportManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            transport_management_routes_1.TransportManagementRouting,
            transport_management_vehiclemaster_module_1.TransportManagementVehicleMasterModule,
            transport_management_drivermaster_module_1.TransportManagementDriverMasterModule,
            transport_management_stage_module_1.TransportManagementStageModule,
            transport_management_route_module_1.TransportManagementRouteModule,
            transport_management_studentroutemapping_module_1.TransportManagementStudentRouteMappingModule,
            transport_management_vehiclemaintenance_module_1.TransportManagementVehicleMaintenanceModule,
            transport_management_vehicledrivermapping_module_1.TransportManagementVehicleDriverMappingModule
        ],
        declarations: [
            transport_management_component_1.TransportManagementComponent
        ],
        providers: [],
    })
], TransportManagementModule);
exports.TransportManagementModule = TransportManagementModule;
//# sourceMappingURL=transport-management.module.js.map