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
const hostel_beds_route_1 = require("./hostel-beds.route");
const hostel_beds_component_1 = require("./hostel-beds.component");
const hostel_beds_service_1 = require("./hostel-beds.service");
let HostelBedsModule = class HostelBedsModule {
};
HostelBedsModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            hostel_beds_route_1.HostelBedsRouting
        ],
        declarations: [
            hostel_beds_component_1.HostelBedsComponent,
        ],
        providers: [
            core_1.forwardRef(() => hostel_beds_service_1.BedService)
        ]
    })
], HostelBedsModule);
exports.HostelBedsModule = HostelBedsModule;
//# sourceMappingURL=hostel-beds.module.js.map