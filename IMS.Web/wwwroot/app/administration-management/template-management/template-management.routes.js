"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const template_management_component_1 = require("./template-management.component");
const templateManagementRoutes = [
    {
        path: 'administration/templates',
        children: [
            { path: '', component: template_management_component_1.TemplateManagementComponent }
        ]
    },
];
exports.TemplateManagementRouting = router_1.RouterModule.forRoot(templateManagementRoutes);
//# sourceMappingURL=template-management.routes.js.map