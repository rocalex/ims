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
const location_component_1 = require("./location.component");
const location_route_1 = require("./location.route");
const location_service_1 = require("./location.service");
let LocationModule = class LocationModule {
};
LocationModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            location_route_1.LocationRouting,
        ],
        declarations: [
            location_component_1.LocationComponent
        ],
        providers: [
            core_1.forwardRef(() => location_service_1.LocationService)
        ]
    })
], LocationModule);
exports.LocationModule = LocationModule;
//# sourceMappingURL=location.module.js.map