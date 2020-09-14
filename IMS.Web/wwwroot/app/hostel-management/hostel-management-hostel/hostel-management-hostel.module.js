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
const hostel_management_hostel_component_1 = require("./hostel-management-hostel.component");
const hostel_management_hostel_routes_1 = require("./hostel-management-hostel.routes");
const hostel_management_hostel_list_component_1 = require("./hostel-management-hostel-list/hostel-management-hostel-list.component");
const hostel_management_hostel_service_1 = require("./hostel-management-hostel.service");
const hostel_management_hostel_add_component_1 = require("./hostel-management-hostel-add/hostel-management-hostel-add.component");
const edit_component_1 = require("./edit/edit.component");
let HostelManagementHostelModule = class HostelManagementHostelModule {
};
HostelManagementHostelModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            hostel_management_hostel_routes_1.HostelManagementHostelRouting
        ],
        declarations: [
            hostel_management_hostel_component_1.HostelManagementHostelComponent,
            hostel_management_hostel_list_component_1.HostelManagementHostelListComponent,
            hostel_management_hostel_add_component_1.HostelManagementAddHostelComponent,
            edit_component_1.EditComponent
        ],
        providers: [
            hostel_management_hostel_service_1.HostelManagementHostelService
        ],
    })
], HostelManagementHostelModule);
exports.HostelManagementHostelModule = HostelManagementHostelModule;
//# sourceMappingURL=hostel-management-hostel.module.js.map