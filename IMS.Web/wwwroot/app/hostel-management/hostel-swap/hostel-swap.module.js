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
const hostel_swap_route_1 = require("./hostel-swap.route");
const hostel_swap_component_1 = require("./hostel-swap.component");
const hostel_swap_service_1 = require("./hostel-swap.service");
let HostelSwapModule = class HostelSwapModule {
};
HostelSwapModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            hostel_swap_route_1.HostelSwapRouting
        ],
        declarations: [
            hostel_swap_component_1.HostelSwapComponent,
            hostel_swap_component_1.DialogOverviewExampleDialog
        ],
        providers: [
            core_1.forwardRef(() => hostel_swap_service_1.SwapService)
        ],
        entryComponents: [
            hostel_swap_component_1.DialogOverviewExampleDialog
        ]
    })
], HostelSwapModule);
exports.HostelSwapModule = HostelSwapModule;
//# sourceMappingURL=hostel-swap.module.js.map