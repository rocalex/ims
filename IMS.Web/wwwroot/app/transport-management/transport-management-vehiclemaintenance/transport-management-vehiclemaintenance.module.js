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
const transport_management_vehiclemaintenance_routes_1 = require("./transport-management-vehiclemaintenance.routes");
const transport_management_vehiclemaintenance_component_1 = require("./transport-management-vehiclemaintenance.component");
const transport_management_maintenance_module_1 = require("./transport-management-maintenance/transport-management-maintenance.module");
const transport_management_repair_module_1 = require("./transport-management-repair/transport-management-repair.module");
const transport_management_accident_module_1 = require("./transport-management-accident/transport-management-accident.module");
const transport_management_breakdown_module_1 = require("./transport-management-breakdown/transport-management-breakdown.module");
let TransportManagementVehicleMaintenanceModule = class TransportManagementVehicleMaintenanceModule {
};
TransportManagementVehicleMaintenanceModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            transport_management_vehiclemaintenance_routes_1.TransportManagementVehicleMaintenanceRouting,
            transport_management_maintenance_module_1.TransportManagementMaintenanceModule,
            transport_management_repair_module_1.TransportManagementRepairModule,
            transport_management_accident_module_1.TransportManagementAccidentModule,
            transport_management_breakdown_module_1.TransportManagementBreakDownModule
        ],
        declarations: [
            transport_management_vehiclemaintenance_component_1.TransportManagementVehicleMaintenanceComponent
        ],
        providers: [],
    })
], TransportManagementVehicleMaintenanceModule);
exports.TransportManagementVehicleMaintenanceModule = TransportManagementVehicleMaintenanceModule;
//# sourceMappingURL=transport-management-vehiclemaintenance.module.js.map