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
const hostel_block_route_1 = require("./hostel-block.route");
const hostel_block_component_1 = require("./hostel-block.component");
const hostel_block_list_component_1 = require("./hostel-block-list/hostel-block-list.component");
const hostel_block_add_component_1 = require("./hostel-block-add/hostel-block-add.component");
const hostel_block_service_1 = require("./hostel-block.service");
const edit_component_1 = require("./edit/edit.component");
let HostelBlockModule = class HostelBlockModule {
};
HostelBlockModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            hostel_block_route_1.HostelBlockRouting
        ],
        declarations: [
            hostel_block_component_1.HostelBlockComponent,
            hostel_block_list_component_1.HostelBlockListComponent,
            hostel_block_add_component_1.HostelBlockAddComponent,
            edit_component_1.EditComponent,
        ],
        providers: [
            core_1.forwardRef(() => hostel_block_service_1.HostelBlockService)
        ]
    })
], HostelBlockModule);
exports.HostelBlockModule = HostelBlockModule;
//# sourceMappingURL=hostel-block.module.js.map