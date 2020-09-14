"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const priceList_component_1 = require("./priceList.component");
const routes = [
    {
        path: 'inventory/pricelist', component: priceList_component_1.PriceListComponent
    }
];
exports.PriceListRouting = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=priceList.route.js.map