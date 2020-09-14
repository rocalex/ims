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
const currency_management_list_component_1 = require("./currency-management-list/currency-management-list.component");
const currency_management_add_component_1 = require("./currency-management-add/currency-management-add.component");
const currency_management_edit_detail_component_1 = require("./currency-management-edit-detail/currency-management-edit-detail.component");
const currency_management_component_1 = require("./currency-management.component");
const currency_management_service_1 = require("./currency-management.service");
let CurrencyManagementModule = class CurrencyManagementModule {
};
CurrencyManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            currency_management_component_1.CurrencyManagementComponent,
            currency_management_add_component_1.AddCurrencyManagementComponent,
            currency_management_edit_detail_component_1.EditAndDetailCurrencyManagementComponent,
            currency_management_list_component_1.ListCurrencyManagementComponent
        ],
        providers: [
            currency_management_service_1.CurrencyManagementService
        ],
    })
], CurrencyManagementModule);
exports.CurrencyManagementModule = CurrencyManagementModule;
//# sourceMappingURL=currency-management.module.js.map