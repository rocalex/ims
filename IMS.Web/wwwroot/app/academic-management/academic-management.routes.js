"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const academic_management_component_1 = require("./academic-management.component");
const city_management_list_component_1 = require("./city-management/city-management-list/city-management-list.component");
const city_management_add_component_1 = require("./city-management/city-management-add/city-management-add.component");
const city_management_edit_detail_component_1 = require("./city-management/city-management-edit-detail/city-management-edit-detail.component");
const country_management_list_component_1 = require("./country-management/country-management-list/country-management-list.component");
const country_management_add_component_1 = require("./country-management/country-management-add/country-management-add.component");
const country_management_edit_detail_component_1 = require("./country-management/country-management-edit-detail/country-management-edit-detail.component");
const currency_management_list_component_1 = require("./currency-management/currency-management-list/currency-management-list.component");
const currency_management_add_component_1 = require("./currency-management/currency-management-add/currency-management-add.component");
const currency_management_edit_detail_component_1 = require("./currency-management/currency-management-edit-detail/currency-management-edit-detail.component");
const state_management_list_component_1 = require("./state-management/state-management-list/state-management-list.component");
const state_management_edit_detail_component_1 = require("./state-management/state-management-edit-detail/state-management-edit-detail.component");
const state_management_add_component_1 = require("./state-management/state-management-add/state-management-add.component");
const permissions_route_guard_1 = require("../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../shared/sidenav/sidenav.model");
const academicManagementRoutes = [
    {
        path: 'academic', component: academic_management_component_1.AcademicManagementComponent,
        children: [
            {
                path: 'city',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: city_management_list_component_1.ListCityManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.AcademicCity, type: 'View' }
                    },
                    {
                        path: 'add', component: city_management_add_component_1.AddCityManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.AcademicCity, type: 'Add' }
                    },
                    {
                        path: ':id', component: city_management_edit_detail_component_1.EditAndDetailCityManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.AcademicCity, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'country',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: country_management_list_component_1.ListCountryManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.AcademicCountry, type: 'View' }
                    },
                    {
                        path: 'add', component: country_management_add_component_1.AddCountryManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.AcademicCountry, type: 'Add' }
                    },
                    {
                        path: ':id', component: country_management_edit_detail_component_1.EditAndDetailCountryManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.AcademicCountry, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'currency',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: currency_management_list_component_1.ListCurrencyManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.AcademicCurrency, type: 'View' }
                    },
                    {
                        path: 'add', component: currency_management_add_component_1.AddCurrencyManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.AcademicCurrency, type: 'Add' }
                    },
                    {
                        path: ':id', component: currency_management_edit_detail_component_1.EditAndDetailCurrencyManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.AcademicCurrency, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'state',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: state_management_list_component_1.ListStateManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.AcademicState, type: 'View' }
                    },
                    {
                        path: 'add', component: state_management_add_component_1.AddStateManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.AcademicState, type: 'Add' }
                    },
                    {
                        path: ':id', component: state_management_edit_detail_component_1.EditAndDetailStateManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.AcademicState, type: 'Edit' }
                    }
                ]
            }
        ]
    },
];
exports.AcademicManagementRouting = router_1.RouterModule.forRoot(academicManagementRoutes);
//# sourceMappingURL=academic-management.routes.js.map