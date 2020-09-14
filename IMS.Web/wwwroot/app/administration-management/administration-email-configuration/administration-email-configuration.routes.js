"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const administration_email_configuration_list_component_1 = require("./administration-email-configuration-list/administration-email-configuration-list.component");
const administration_email_configuration_add_component_1 = require("./administration-email-configuration-add/administration-email-configuration-add.component");
const administration_email_configuration_edit_details_component_1 = require("./administration-email-configuration-edit-details/administration-email-configuration-edit-details.component");
const emailConfigurationManagementRoutes = [
    {
        path: 'administration/emailconfiguration',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: administration_email_configuration_list_component_1.ListEmailConfigurationManagementComponent },
            { path: 'add', component: administration_email_configuration_add_component_1.AddDepartmentManagementComponent },
            { path: ':id', component: administration_email_configuration_edit_details_component_1.EditDetailsDepartmentManagementComponent }
        ]
    },
];
exports.EmailConfigurationManagementRouting = router_1.RouterModule.forRoot(emailConfigurationManagementRoutes);
//# sourceMappingURL=administration-email-configuration.routes.js.map