"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const resource_file_component_1 = require("./resource-file/resource-file.component");
const superAdminAppRoutes = [
    { path: '', redirectTo: 'institute', pathMatch: 'full' },
    { path: 'resourcefile', component: resource_file_component_1.ResourceFileManagementComponent }
];
exports.SuperAdminAppRouting = router_1.RouterModule.forRoot(superAdminAppRoutes);
//# sourceMappingURL=app-superadmin.routes.js.map