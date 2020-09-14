"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../shared/shared.module");
const hostel_management_component_1 = require("./hostel-management.component");
const hostel_management_dashboard_module_1 = require("./hostel-management-dashboard/hostel-management-dashboard.module");
const hostel_management_route_1 = require("./hostel-management.route");
const hostel_management_hostel_module_1 = require("./hostel-management-hostel/hostel-management-hostel.module");
const hostel_block_module_1 = require("./hostel-block/hostel-block.module");
const hostel_floor_module_1 = require("./hostel-floor/hostel-floor.module");
const hostel_allocate_module_1 = require("./hostel-allocate/hostel-allocate.module");
const hostel_beds_module_1 = require("./hostel-beds/hostel-beds.module");
const hostel_swap_module_1 = require("./hostel-swap/hostel-swap.module");
const lookup_module_1 = require("./lookup/lookup.module");
const mess_manage_module_1 = require("./mess-manage/mess-manage.module");
const report_module_1 = require("./reports/report.module");
let HostelManagementModule = class HostelManagementModule {
};
HostelManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            hostel_management_route_1.HostelManagementRouting,
            hostel_management_dashboard_module_1.HostelManagementDashboardModule,
            hostel_management_hostel_module_1.HostelManagementHostelModule,
            hostel_block_module_1.HostelBlockModule,
            hostel_floor_module_1.HostelFloorModule,
            hostel_allocate_module_1.HostelAllocateModule,
            hostel_beds_module_1.HostelBedsModule,
            hostel_swap_module_1.HostelSwapModule,
            lookup_module_1.LookupModule,
            mess_manage_module_1.MessManageModule,
            report_module_1.ReportModule
        ],
        declarations: [
            hostel_management_component_1.HostelManagementComponent,
        ],
        providers: []
    })
], HostelManagementModule);
exports.HostelManagementModule = HostelManagementModule;
//# sourceMappingURL=hostel-management.module.js.map