"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const branch_component_1 = require("./branch.component");
const routes = [
    {
        path: 'inventory/branch', component: branch_component_1.BranchComponent
    }
];
exports.BranchRouting = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=branch.route.js.map