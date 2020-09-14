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
const transport_management_vehiclemaster_routes_1 = require("./transport-management-vehiclemaster.routes");
const transport_management_vehiclemaster_component_1 = require("./transport-management-vehiclemaster.component");
const transport_management_vehiclemaster_service_1 = require("./transport-management-vehiclemaster.service");
const transport_management_vehiclemaster_list_component_1 = require("./transport-management-vehiclemaster-list/transport-management-vehiclemaster-list.component");
const transport_management_vehiclemaster_edit_detail_component_1 = require("./transport-management-vehiclemaster-edit-detail/transport-management-vehiclemaster-edit-detail.component");
const transport_management_vehiclemaster_add_component_1 = require("./transport-management-vehiclemaster-add/transport-management-vehiclemaster-add.component");
let TransportManagementVehicleMasterModule = class TransportManagementVehicleMasterModule {
};
TransportManagementVehicleMasterModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            transport_management_vehiclemaster_routes_1.TransportManagementVehicleMasterRouting
        ],
        declarations: [
            transport_management_vehiclemaster_component_1.TransportManagementVehicleMasterComponent,
            transport_management_vehiclemaster_list_component_1.ListTransportManagementVehicleMasterComponent,
            transport_management_vehiclemaster_edit_detail_component_1.EditAndDetailTransportManagementVehicleMasterComponent,
            transport_management_vehiclemaster_add_component_1.AddTransportManagementVehicleMasterComponent
        ],
        providers: [
            transport_management_vehiclemaster_service_1.VehicleMasterService
        ],
    })
], TransportManagementVehicleMasterModule);
exports.TransportManagementVehicleMasterModule = TransportManagementVehicleMasterModule;
//# sourceMappingURL=transport-management-vehiclemaster.module.js.map