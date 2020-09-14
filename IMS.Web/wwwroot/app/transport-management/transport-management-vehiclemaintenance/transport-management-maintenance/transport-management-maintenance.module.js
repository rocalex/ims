"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../../../shared/shared.module");
const transport_management_maintenance_component_1 = require("./transport-management-maintenance.component");
const transport_management_maintenance_service_1 = require("./transport-management-maintenance.service");
const transport_management_maintenance_list_component_1 = require("./transport-management-maintenance-list/transport-management-maintenance-list.component");
const transport_management_maintenance_add_component_1 = require("./transport-management-maintenance-add/transport-management-maintenance-add.component");
const transport_management_maintenance_edit_component_1 = require("./transport-management-maintenance-edit-detail/transport-management-maintenance-edit.component");
let TransportManagementMaintenanceModule = class TransportManagementMaintenanceModule {
};
TransportManagementMaintenanceModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule
        ],
        declarations: [
            transport_management_maintenance_component_1.TransportManagementMaintenanceComponent,
            transport_management_maintenance_add_component_1.AddTransportManagementMaintenanceComponent,
            transport_management_maintenance_list_component_1.ListTransportManagementMaintenanceComponent,
            transport_management_maintenance_edit_component_1.EditAndDetailTransportManagementMaintenanceComponent
        ],
        providers: [
            transport_management_maintenance_service_1.TransportManagementMaintenanceService
        ],
    })
], TransportManagementMaintenanceModule);
exports.TransportManagementMaintenanceModule = TransportManagementMaintenanceModule;
//# sourceMappingURL=transport-management-maintenance.module.js.map