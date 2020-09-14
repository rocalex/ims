"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../shared/shared.module");
const academic_management_routes_1 = require("./academic-management.routes");
const academic_management_component_1 = require("./academic-management.component");
const city_management_module_1 = require("./city-management/city-management.module");
const country_management_module_1 = require("./country-management/country-management.module");
const state_management_module_1 = require("./state-management/state-management.module");
const currency_management_module_1 = require("./currency-management/currency-management.module");
let AcademicManagementModule = class AcademicManagementModule {
};
AcademicManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            academic_management_routes_1.AcademicManagementRouting,
            city_management_module_1.CityManagementModule,
            country_management_module_1.CountryManagementModule,
            state_management_module_1.StateManagementModule,
            currency_management_module_1.CurrencyManagementModule
        ],
        declarations: [
            academic_management_component_1.AcademicManagementComponent
        ],
        providers: [],
    })
], AcademicManagementModule);
exports.AcademicManagementModule = AcademicManagementModule;
//# sourceMappingURL=academic-management.module.js.map