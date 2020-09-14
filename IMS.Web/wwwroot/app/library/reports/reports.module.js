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
const reports_route_1 = require("./reports.route");
const reports_component_1 = require("./reports.component");
const reports_service_1 = require("./reports.service");
const userwise_component_1 = require("./userwise/userwise.component");
const bookwise_component_1 = require("./bookwise/bookwise.component");
let ReportsModule = class ReportsModule {
};
ReportsModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            reports_route_1.ReportRouting
        ],
        declarations: [
            reports_component_1.ReportsComponent,
            bookwise_component_1.BookWiseComponent,
            userwise_component_1.UserWiseComponent
        ],
        providers: [
            core_1.forwardRef(() => reports_service_1.ReportService)
        ]
    })
], ReportsModule);
exports.ReportsModule = ReportsModule;
//# sourceMappingURL=reports.module.js.map