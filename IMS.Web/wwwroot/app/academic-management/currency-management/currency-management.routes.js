"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const currency_management_list_component_1 = require("./currency-management-list/currency-management-list.component");
const currency_management_add_component_1 = require("./currency-management-add/currency-management-add.component");
const currency_management_edit_detail_component_1 = require("./currency-management-edit-detail/currency-management-edit-detail.component");
const currencyManagementRoutes = [
    {
        path: 'academic/currency',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: currency_management_list_component_1.ListCurrencyManagementComponent },
            { path: 'add', component: currency_management_add_component_1.AddCurrencyManagementComponent },
            { path: ':id', component: currency_management_edit_detail_component_1.EditAndDetailCurrencyManagementComponent }
        ]
    },
];
exports.CurrencyManagementRouting = router_1.RouterModule.forRoot(currencyManagementRoutes);
//# sourceMappingURL=currency-management.routes.js.map