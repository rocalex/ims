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
const finance_management_payment_types_routes_1 = require("./finance-management-payment-types.routes");
const finance_management_payment_types_service_1 = require("./finance-management-payment-types.service");
const finance_management_payment_types_component_1 = require("./finance-management-payment-types.component");
const finance_management_payment_types_list_component_1 = require("./finance-management-payment-types-list/finance-management-payment-types-list.component");
const finance_management_payment_types_add_component_1 = require("./finance-management-payment-types-add/finance-management-payment-types-add.component");
const finance_management_payment_types_edit_details_component_1 = require("./finance-management-payment-types-edit-details/finance-management-payment-types-edit-details.component");
let FinanceManagementPaymentTypesModule = class FinanceManagementPaymentTypesModule {
};
FinanceManagementPaymentTypesModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            finance_management_payment_types_routes_1.FinanceManagementPaymentTypesRouting
        ],
        declarations: [
            finance_management_payment_types_component_1.FinanceManagementPaymentTypesComponent,
            finance_management_payment_types_list_component_1.ListFinanceManagementPaymentTypesComponent,
            finance_management_payment_types_add_component_1.AddFinanceManagementPaymentTypesComponent,
            finance_management_payment_types_edit_details_component_1.EditDetailsFinanceManagementPaymentTypesComponent
        ],
        providers: [
            finance_management_payment_types_service_1.FinanceManagementPaymentTypesService
        ],
    })
], FinanceManagementPaymentTypesModule);
exports.FinanceManagementPaymentTypesModule = FinanceManagementPaymentTypesModule;
//# sourceMappingURL=finance-management-payment-types.module.js.map