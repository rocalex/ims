"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const city_management_add_component_1 = require("./city-management-add/city-management-add.component");
const city_management_edit_detail_component_1 = require("./city-management-edit-detail/city-management-edit-detail.component");
const city_management_list_component_1 = require("./city-management-list/city-management-list.component");
const cityManagementRoutes = [
    {
        path: 'academic/city',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: city_management_list_component_1.ListCityManagementComponent },
            { path: 'add', component: city_management_add_component_1.AddCityManagementComponent },
            { path: ':id', component: city_management_edit_detail_component_1.EditAndDetailCityManagementComponent }
        ]
    },
];
exports.CityManagementRouting = router_1.RouterModule.forRoot(cityManagementRoutes);
//# sourceMappingURL=city-management.routes.js.map