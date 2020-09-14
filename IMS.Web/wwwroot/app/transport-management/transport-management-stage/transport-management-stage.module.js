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
const transport_management_stage_routes_1 = require("./transport-management-stage.routes");
const transport_management_stage_component_1 = require("./transport-management-stage.component");
const transport_management_stage_service_1 = require("./transport-management-stage.service");
const transport_management_stage_list_component_1 = require("./transport-management-stage-list/transport-management-stage-list.component");
const transport_management_stage_edit_detail_component_1 = require("./transport-management-stage-edit-detail/transport-management-stage-edit-detail.component");
const transport_management_stage_add_component_1 = require("./transport-management-stage-add/transport-management-stage-add.component");
let TransportManagementStageModule = class TransportManagementStageModule {
};
TransportManagementStageModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            transport_management_stage_routes_1.TransportManagementStageRouting
        ],
        declarations: [
            transport_management_stage_component_1.TransportManagementStageComponent,
            transport_management_stage_list_component_1.ListTransportManagementStageComponent,
            transport_management_stage_edit_detail_component_1.EditAndDetailTransportManagementStageComponent,
            transport_management_stage_add_component_1.AddTransportManagementStageComponent
        ],
        providers: [
            transport_management_stage_service_1.StageService
        ],
    })
], TransportManagementStageModule);
exports.TransportManagementStageModule = TransportManagementStageModule;
//# sourceMappingURL=transport-management-stage.module.js.map