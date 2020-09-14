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
const event_management_report_service_1 = require("./event-management-report.service");
const event_management_report_component_1 = require("./event-management-report.component");
let EventManagementReportModule = class EventManagementReportModule {
};
EventManagementReportModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule
        ],
        declarations: [
            event_management_report_component_1.EventManagementReportComponent
        ],
        providers: [
            event_management_report_service_1.EventManagementReportService
        ]
    })
], EventManagementReportModule);
exports.EventManagementReportModule = EventManagementReportModule;
//# sourceMappingURL=event-management-report.module.js.map