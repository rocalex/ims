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
const finance_management_routes_1 = require("./finance-management.routes");
const finance_management_component_1 = require("./finance-management.component");
const finance_management_receipt_module_1 = require("./finance-management-receipt/finance-management-receipt.module");
const finance_management_chartofaccounts_module_1 = require("./finance-management-chartofaccounts/finance-management-chartofaccounts.module");
const finance_management_payments_module_1 = require("./finance-management-payments/finance-management-payments.module");
const finance_management_payment_types_module_1 = require("./finance-management-payment-types/finance-management-payment-types.module");
let FinanceManagementModule = class FinanceManagementModule {
};
FinanceManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            finance_management_routes_1.FinanceManagementRouting,
            finance_management_receipt_module_1.FinanceManagementReceiptModule,
            finance_management_chartofaccounts_module_1.FinanceManagementChartOfAccountsModule,
            finance_management_payments_module_1.FinanceManagementPaymentsModule,
            finance_management_payment_types_module_1.FinanceManagementPaymentTypesModule
        ],
        declarations: [
            finance_management_component_1.FinanceManagementComponent
        ],
        providers: [],
    })
], FinanceManagementModule);
exports.FinanceManagementModule = FinanceManagementModule;
//# sourceMappingURL=finance-management.module.js.map