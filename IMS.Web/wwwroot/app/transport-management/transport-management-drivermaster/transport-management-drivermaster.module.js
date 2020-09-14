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
const transport_management_drivermaster_routes_1 = require("./transport-management-drivermaster.routes");
const transport_management_drivermaster_component_1 = require("./transport-management-drivermaster.component");
const transport_management_drivermaster_service_1 = require("./transport-management-drivermaster.service");
const transport_management_drivermaster_list_component_1 = require("./transport-management-drivermaster-list/transport-management-drivermaster-list.component");
const transport_management_drivermaster_edit_detail_component_1 = require("./transport-management-drivermaster-edit-detail/transport-management-drivermaster-edit-detail.component");
const transport_management_drivermaster_add_component_1 = require("./transport-management-drivermaster-add/transport-management-drivermaster-add.component");
let TransportManagementDriverMasterModule = class TransportManagementDriverMasterModule {
};
TransportManagementDriverMasterModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            transport_management_drivermaster_routes_1.TransportManagementDriverMasterRouting
        ],
        declarations: [
            transport_management_drivermaster_component_1.TransportManagementDriverMasterComponent,
            transport_management_drivermaster_list_component_1.ListTransportManagementDriverMasterComponent,
            transport_management_drivermaster_edit_detail_component_1.EditAndDetailTransportManagementDriverMasterComponent,
            transport_management_drivermaster_add_component_1.AddTransportManagementDriverMasterComponent
        ],
        providers: [
            transport_management_drivermaster_service_1.DriverMasterService
        ],
    })
], TransportManagementDriverMasterModule);
exports.TransportManagementDriverMasterModule = TransportManagementDriverMasterModule;
//# sourceMappingURL=transport-management-drivermaster.module.js.map