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
const hostel_allocate_route_1 = require("./hostel-allocate.route");
const hostel_allocate_component_1 = require("./hostel-allocate.component");
const hostel_allocate_service_1 = require("./hostel-allocate.service");
let HostelAllocateModule = class HostelAllocateModule {
};
HostelAllocateModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            hostel_allocate_route_1.HostelAllocateRouting
        ],
        declarations: [
            hostel_allocate_component_1.HostelAllocateComponent,
        ],
        providers: [
            core_1.forwardRef(() => hostel_allocate_service_1.AllocateService)
        ]
    })
], HostelAllocateModule);
exports.HostelAllocateModule = HostelAllocateModule;
//# sourceMappingURL=hostel-allocate.module.js.map