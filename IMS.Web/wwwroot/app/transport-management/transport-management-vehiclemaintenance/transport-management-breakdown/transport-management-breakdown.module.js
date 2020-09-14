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
const transport_management_breakdown_component_1 = require("./transport-management-breakdown.component");
const transport_management_breakdown_service_1 = require("./transport-management-breakdown.service");
const transport_management_breakdown_list_component_1 = require("./transport-management-breakdown-list/transport-management-breakdown-list.component");
const transport_management_breakdown_add_component_1 = require("./transport-management-breakdown-add/transport-management-breakdown-add.component");
const transport_management_breakdown_edit_component_1 = require("./transport-management-breakdown-edit-detail/transport-management-breakdown-edit.component");
let TransportManagementBreakDownModule = class TransportManagementBreakDownModule {
};
TransportManagementBreakDownModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule
        ],
        declarations: [
            transport_management_breakdown_component_1.TransportManagementBreakDownComponent,
            transport_management_breakdown_add_component_1.AddTransportManagementBreakDownComponent,
            transport_management_breakdown_list_component_1.ListTransportManagementBreakDownComponent,
            transport_management_breakdown_edit_component_1.EditAndDetailTransportManagementBreakDownComponent
        ],
        providers: [
            transport_management_breakdown_service_1.TransportManagementBreakDownService
        ],
    })
], TransportManagementBreakDownModule);
exports.TransportManagementBreakDownModule = TransportManagementBreakDownModule;
//# sourceMappingURL=transport-management-breakdown.module.js.map