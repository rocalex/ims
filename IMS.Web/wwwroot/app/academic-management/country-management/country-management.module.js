"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../../shared/shared.module");
const country_management_component_1 = require("./country-management.component");
const country_management_add_component_1 = require("./country-management-add/country-management-add.component");
const country_management_edit_detail_component_1 = require("./country-management-edit-detail/country-management-edit-detail.component");
const country_management_list_component_1 = require("./country-management-list/country-management-list.component");
const country_management_service_1 = require("./country-management.service");
let CountryManagementModule = class CountryManagementModule {
};
CountryManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            country_management_component_1.CountryManagementComponent,
            country_management_add_component_1.AddCountryManagementComponent,
            country_management_edit_detail_component_1.EditAndDetailCountryManagementComponent,
            country_management_list_component_1.ListCountryManagementComponent
        ],
        providers: [
            country_management_service_1.CountryManagementService
        ],
    })
], CountryManagementModule);
exports.CountryManagementModule = CountryManagementModule;
//# sourceMappingURL=country-management.module.js.map