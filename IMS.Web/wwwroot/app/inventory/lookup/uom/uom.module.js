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
const uom_component_1 = require("./uom.component");
const uom_route_1 = require("./uom.route");
const add_component_1 = require("./add/add.component");
const edit_component_1 = require("./edit/edit.component");
const list_component_1 = require("./list/list.component");
const uom_service_1 = require("./uom.service");
let UOMModule = class UOMModule {
};
UOMModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            uom_route_1.UOMRouting,
        ],
        declarations: [
            uom_component_1.UOMComponent,
            add_component_1.AddComponent,
            edit_component_1.EditComponent,
            list_component_1.ListComponent
        ],
        providers: [
            core_1.forwardRef(() => uom_service_1.UOMService)
        ]
    })
], UOMModule);
exports.UOMModule = UOMModule;
//# sourceMappingURL=uom.module.js.map