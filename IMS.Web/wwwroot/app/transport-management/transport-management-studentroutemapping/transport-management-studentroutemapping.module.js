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
const transport_management_studentroutemapping_routes_1 = require("./transport-management-studentroutemapping.routes");
const transport_management_studentroutemapping_component_1 = require("./transport-management-studentroutemapping.component");
const transport_management_studentroutemapping_service_1 = require("./transport-management-studentroutemapping.service");
const transport_management_studentroutemapping_list_component_1 = require("./transport-management-studentroutemapping-list/transport-management-studentroutemapping-list.component");
const transport_management_studentroutemapping_edit_detail_component_1 = require("./transport-management-studentroutemapping-edit-detail/transport-management-studentroutemapping-edit-detail.component");
let TransportManagementStudentRouteMappingModule = class TransportManagementStudentRouteMappingModule {
};
TransportManagementStudentRouteMappingModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            transport_management_studentroutemapping_routes_1.TransportManagementStudentRouteMappingRouting
        ],
        declarations: [
            transport_management_studentroutemapping_component_1.TransportManagementStudentRouteMappingComponent,
            transport_management_studentroutemapping_list_component_1.ListTransportManagementStudentRouteMappingComponent,
            transport_management_studentroutemapping_edit_detail_component_1.EditAndDetailTransportManagementStudentRouteMappingComponent
        ],
        providers: [
            transport_management_studentroutemapping_service_1.StudentRouteMappingService
        ],
    })
], TransportManagementStudentRouteMappingModule);
exports.TransportManagementStudentRouteMappingModule = TransportManagementStudentRouteMappingModule;
//# sourceMappingURL=transport-management-studentroutemapping.module.js.map