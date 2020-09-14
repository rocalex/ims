"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const location_component_1 = require("./location.component");
const routes = [
    {
        path: 'inventory/location', component: location_component_1.LocationComponent
    }
];
exports.LocationRouting = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=location.route.js.map