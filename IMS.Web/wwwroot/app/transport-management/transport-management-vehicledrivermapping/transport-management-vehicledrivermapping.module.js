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
const transport_management_vehicledrivermapping_routes_1 = require("./transport-management-vehicledrivermapping.routes");
const transport_management_vehicledrivermapping_component_1 = require("./transport-management-vehicledrivermapping.component");
const transport_management_vehicledrivermapping_service_1 = require("./transport-management-vehicledrivermapping.service");
const transport_management_vehicledrivermapping_list_component_1 = require("./transport-management-vehicledrivermapping-list/transport-management-vehicledrivermapping-list.component");
const transport_management_vehicledrivermapping_edit_detail_component_1 = require("./transport-management-vehicledrivermapping-edit-detail/transport-management-vehicledrivermapping-edit-detail.component");
let TransportManagementVehicleDriverMappingModule = class TransportManagementVehicleDriverMappingModule {
};
TransportManagementVehicleDriverMappingModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            transport_management_vehicledrivermapping_routes_1.TransportManagementVehicleDriverMappingRouting
        ],
        declarations: [
            transport_management_vehicledrivermapping_component_1.TransportManagementVehicleDriverMappingComponent,
            transport_management_vehicledrivermapping_list_component_1.ListTransportManagementVehicleDriverMappingComponent,
            transport_management_vehicledrivermapping_edit_detail_component_1.EditAndDetailTransportManagementVehicleDriverMappingComponent
        ],
        providers: [
            transport_management_vehicledrivermapping_service_1.VehicleDriverMappingService
        ],
    })
], TransportManagementVehicleDriverMappingModule);
exports.TransportManagementVehicleDriverMappingModule = TransportManagementVehicleDriverMappingModule;
//# sourceMappingURL=transport-management-vehicledrivermapping.module.js.map