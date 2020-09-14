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
const finance_management_chartofaccounts_routes_1 = require("./finance-management-chartofaccounts.routes");
const finance_management_chartofaccounts_service_1 = require("./finance-management-chartofaccounts.service");
const finance_management_chartofaccounts_component_1 = require("./finance-management-chartofaccounts.component");
const finance_management_chartofaccounts_list_component_1 = require("./finance-management-chartofaccounts-list/finance-management-chartofaccounts-list.component");
const finance_management_chartofaccounts_add_component_1 = require("./finance-management-chartofaccounts-add/finance-management-chartofaccounts-add.component");
const finance_management_chartofaccounts_edit_details_component_1 = require("./finance-management-chartofaccounts-edit-details/finance-management-chartofaccounts-edit-details.component");
let FinanceManagementChartOfAccountsModule = class FinanceManagementChartOfAccountsModule {
};
FinanceManagementChartOfAccountsModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            finance_management_chartofaccounts_routes_1.FinanceManagementChartOfAccountsRouting
        ],
        declarations: [
            finance_management_chartofaccounts_component_1.FinanceManagementChartOfAccountsComponent,
            finance_management_chartofaccounts_list_component_1.ListFinanceManagementChartOfAccountsComponent,
            finance_management_chartofaccounts_add_component_1.AddFinanceManagementChartOfAccountsComponent,
            finance_management_chartofaccounts_edit_details_component_1.EditDetailsFinanceManagementChartOfAccountsComponent
        ],
        providers: [
            finance_management_chartofaccounts_service_1.FinanceManagementChartOfAccountsService
        ],
    })
], FinanceManagementChartOfAccountsModule);
exports.FinanceManagementChartOfAccountsModule = FinanceManagementChartOfAccountsModule;
//# sourceMappingURL=finance-management-chartofaccounts.module.js.map