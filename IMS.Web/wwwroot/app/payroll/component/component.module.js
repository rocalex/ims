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
const component_route_1 = require("./component.route");
const component_component_1 = require("./component.component");
const list_component_1 = require("./list/list.component");
const add_component_1 = require("./add/add.component");
const component_service_1 = require("./component.service");
const edit_component_1 = require("./edit/edit.component");
let ComponentModule = class ComponentModule {
};
ComponentModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            component_route_1.ComponentRouting
        ],
        declarations: [
            component_component_1.ComponentComponent,
            list_component_1.ListComponent,
            add_component_1.AddComponent,
            edit_component_1.EditComponent
        ],
        providers: [
            core_1.forwardRef(() => component_service_1.ComponentService)
        ]
    })
], ComponentModule);
exports.ComponentModule = ComponentModule;
//# sourceMappingURL=component.module.js.map