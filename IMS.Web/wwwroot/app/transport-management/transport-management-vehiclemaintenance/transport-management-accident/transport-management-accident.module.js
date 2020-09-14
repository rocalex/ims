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
const transport_management_accident_component_1 = require("./transport-management-accident.component");
const transport_management_accident_service_1 = require("./transport-management-accident.service");
const transport_management_accident_list_component_1 = require("./transport-management-accident-list/transport-management-accident-list.component");
const transport_management_accident_add_component_1 = require("./transport-management-accident-add/transport-management-accident-add.component");
const transport_management_accident_edit_component_1 = require("./transport-management-accident-edit-detail/transport-management-accident-edit.component");
let TransportManagementAccidentModule = class TransportManagementAccidentModule {
};
TransportManagementAccidentModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule
        ],
        declarations: [
            transport_management_accident_component_1.TransportManagementAccidentComponent,
            transport_management_accident_add_component_1.AddTransportManagementAccidentComponent,
            transport_management_accident_list_component_1.ListTransportManagementAccidentComponent,
            transport_management_accident_edit_component_1.EditAndDetailTransportManagementAccidentComponent
        ],
        providers: [
            transport_management_accident_service_1.TransportManagementAccidentService
        ],
    })
], TransportManagementAccidentModule);
exports.TransportManagementAccidentModule = TransportManagementAccidentModule;
//# sourceMappingURL=transport-management-accident.module.js.map