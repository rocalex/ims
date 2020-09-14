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
const priceList_component_1 = require("./priceList.component");
const priceList_route_1 = require("./priceList.route");
const priceList_service_1 = require("./priceList.service");
let PriceListModule = class PriceListModule {
};
PriceListModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            priceList_route_1.PriceListRouting,
        ],
        declarations: [
            priceList_component_1.PriceListComponent
        ],
        providers: [
            core_1.forwardRef(() => priceList_service_1.PriceListService)
        ]
    })
], PriceListModule);
exports.PriceListModule = PriceListModule;
//# sourceMappingURL=priceList.module.js.map