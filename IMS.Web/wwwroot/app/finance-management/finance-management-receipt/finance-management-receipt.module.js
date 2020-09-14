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
const finance_management_receipt_routes_1 = require("./finance-management-receipt.routes");
const finance_management_receipt_service_1 = require("./finance-management-receipt.service");
const finance_management_receipt_component_1 = require("./finance-management-receipt.component");
const finance_management_receipt_list_component_1 = require("./finance-management-receipt-list/finance-management-receipt-list.component");
const finance_management_receipt_add_component_1 = require("./finance-management-receipt-add/finance-management-receipt-add.component");
const finance_management_receipt_edit_details_component_1 = require("./finance-management-receipt-edit-details/finance-management-receipt-edit-details.component");
let FinanceManagementReceiptModule = class FinanceManagementReceiptModule {
};
FinanceManagementReceiptModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            finance_management_receipt_routes_1.FinanceManagementReceiptRouting
        ],
        declarations: [
            finance_management_receipt_component_1.FinanceManagementReceiptComponent,
            finance_management_receipt_list_component_1.ListFinanceManagementReceiptComponent,
            finance_management_receipt_add_component_1.AddFinanceManagementReceiptComponent,
            finance_management_receipt_edit_details_component_1.EditDetailsFinanceManagementReceiptComponent
        ],
        providers: [
            finance_management_receipt_service_1.FinanceManagementReceiptService
        ],
    })
], FinanceManagementReceiptModule);
exports.FinanceManagementReceiptModule = FinanceManagementReceiptModule;
//# sourceMappingURL=finance-management-receipt.module.js.map