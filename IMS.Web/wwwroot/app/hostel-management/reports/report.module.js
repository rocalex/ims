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
const report_component_1 = require("./report.component");
const report_route_1 = require("./report.route");
const allocate_component_1 = require("./allocate/allocate.component");
const messmanage_component_1 = require("./messmanage/messmanage.component");
const report_service_1 = require("./report.service");
let ReportModule = class ReportModule {
};
ReportModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            report_route_1.ReportRouting
        ],
        declarations: [
            report_component_1.ReportComponent,
            allocate_component_1.AllocateComponent,
            messmanage_component_1.MessManageComponent
        ],
        providers: [
            core_1.forwardRef(() => report_service_1.ReportService)
        ],
    })
], ReportModule);
exports.ReportModule = ReportModule;
//# sourceMappingURL=report.module.js.map