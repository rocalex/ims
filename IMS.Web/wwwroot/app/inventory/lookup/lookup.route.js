"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const lookup_component_1 = require("./lookup.component");
const routes = [
    {
        path: 'inventory/lookup', component: lookup_component_1.LookUpComponent
    }
];
exports.LookupRouting = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=lookup.route.js.map