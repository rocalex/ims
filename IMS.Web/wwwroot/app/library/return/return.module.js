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
const return_route_1 = require("./return.route");
const return_component_1 = require("./return.component");
const return_service_1 = require("./return.service");
let ReturnModule = class ReturnModule {
};
ReturnModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            return_route_1.ReturnRouting
        ],
        declarations: [
            return_component_1.ReturnComponent,
        ],
        providers: [
            core_1.forwardRef(() => return_service_1.ReturnService)
        ]
    })
], ReturnModule);
exports.ReturnModule = ReturnModule;
//# sourceMappingURL=return.module.js.map