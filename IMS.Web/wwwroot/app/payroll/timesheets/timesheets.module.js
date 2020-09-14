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
const timesheets_route_1 = require("./timesheets.route");
const timesheets_component_1 = require("./timesheets.component");
const timesheets_service_1 = require("./timesheets.service");
let TimesheetsModule = class TimesheetsModule {
};
TimesheetsModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            timesheets_route_1.TimesheetsRouting
        ],
        declarations: [
            timesheets_component_1.TimesheetsComponent,
        ],
        providers: [
            core_1.forwardRef(() => timesheets_service_1.TimeSheetService)
        ]
    })
], TimesheetsModule);
exports.TimesheetsModule = TimesheetsModule;
//# sourceMappingURL=timesheets.module.js.map