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
const lookup_component_1 = require("./lookup.component");
const itemtype_module_1 = require("./itemtype/itemtype.module");
const taxtype_module_1 = require("./taxtype/taxtype.module");
const lookup_route_1 = require("./lookup.route");
const uom_module_1 = require("./uom/uom.module");
let LookupModule = class LookupModule {
};
LookupModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            itemtype_module_1.ItemTypeModule,
            taxtype_module_1.TaxTypeModule,
            uom_module_1.UOMModule,
            lookup_route_1.LookupRouting
        ],
        declarations: [
            lookup_component_1.LookUpComponent
        ],
        providers: []
    })
], LookupModule);
exports.LookupModule = LookupModule;
//# sourceMappingURL=lookup.module.js.map