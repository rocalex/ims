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
const hostel_floor_route_1 = require("./hostel-floor.route");
const hostel_floor_component_1 = require("./hostel-floor.component");
const detail_component_1 = require("./detail/detail.component");
const hostel_floor_service_1 = require("./hostel-floor.service");
let HostelFloorModule = class HostelFloorModule {
};
HostelFloorModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            hostel_floor_route_1.HostelFloorRouting
        ],
        declarations: [
            hostel_floor_component_1.HostelFloorComponent,
            detail_component_1.DetailComponent,
            detail_component_1.DialogOverviewExampleDialog,
            detail_component_1.EditDialog
        ],
        providers: [
            core_1.forwardRef(() => hostel_floor_service_1.FloorRoomService)
        ],
        entryComponents: [
            detail_component_1.DialogOverviewExampleDialog,
            detail_component_1.EditDialog
        ]
    })
], HostelFloorModule);
exports.HostelFloorModule = HostelFloorModule;
//# sourceMappingURL=hostel-floor.module.js.map