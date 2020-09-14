"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const country_management_add_component_1 = require("./country-management-add/country-management-add.component");
const country_management_edit_detail_component_1 = require("./country-management-edit-detail/country-management-edit-detail.component");
const country_management_list_component_1 = require("./country-management-list/country-management-list.component");
const countryManagementRoutes = [
    {
        path: 'academic/country',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: country_management_list_component_1.ListCountryManagementComponent },
            { path: 'add', component: country_management_add_component_1.AddCountryManagementComponent },
            { path: ':id', component: country_management_edit_detail_component_1.EditAndDetailCountryManagementComponent }
        ]
    },
];
exports.CountryManagementRouting = router_1.RouterModule.forRoot(countryManagementRoutes);
//# sourceMappingURL=country-management.routes.js.map