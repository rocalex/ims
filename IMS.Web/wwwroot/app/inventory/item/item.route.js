"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const item_component_1 = require("./item.component");
const routes = [
    {
        path: 'inventory/item', component: item_component_1.ItemComponent
    }
];
exports.ItemRouting = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=item.route.js.map