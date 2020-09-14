"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../shared/shared.module");
const inventory_component_1 = require("./inventory.component");
const lookup_module_1 = require("./lookup/lookup.module");
const inventory_route_1 = require("./inventory.route");
const location_module_1 = require("./location/location.module");
const branch_module_1 = require("./branch/branch.module");
const item_module_1 = require("./item/item.module");
const priceList_module_1 = require("./priceList/priceList.module");
let InventoryModule = class InventoryModule {
};
InventoryModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            lookup_module_1.LookupModule,
            location_module_1.LocationModule,
            branch_module_1.BranchModule,
            item_module_1.ItemModule,
            priceList_module_1.PriceListModule,
            inventory_route_1.InventoryRouting
        ],
        declarations: [
            inventory_component_1.InventoryComponent,
        ],
        providers: []
    })
], InventoryModule);
exports.InventoryModule = InventoryModule;
//# sourceMappingURL=inventory.module.js.map