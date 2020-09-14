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
const finance_management_payments_routes_1 = require("./finance-management-payments.routes");
const finance_management_payments_service_1 = require("./finance-management-payments.service");
const finance_management_payments_component_1 = require("./finance-management-payments.component");
const finance_management_payments_list_component_1 = require("./finance-management-payments-list/finance-management-payments-list.component");
const finance_management_payments_add_component_1 = require("./finance-management-payments-add/finance-management-payments-add.component");
const finance_management_payments_edit_details_component_1 = require("./finance-management-payments-edit-details/finance-management-payments-edit-details.component");
let FinanceManagementPaymentsModule = class FinanceManagementPaymentsModule {
};
FinanceManagementPaymentsModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            finance_management_payments_routes_1.FinanceManagementPaymentsRouting
        ],
        declarations: [
            finance_management_payments_component_1.FinanceManagementPaymentsComponent,
            finance_management_payments_list_component_1.ListFinanceManagementPaymentsComponent,
            finance_management_payments_add_component_1.AddFinanceManagementPaymentsComponent,
            finance_management_payments_edit_details_component_1.EditDetailsFinanceManagementPaymentsComponent
        ],
        providers: [
            finance_management_payments_service_1.FinanceManagementPaymentsService
        ],
    })
], FinanceManagementPaymentsModule);
exports.FinanceManagementPaymentsModule = FinanceManagementPaymentsModule;
//# sourceMappingURL=finance-management-payments.module.js.map