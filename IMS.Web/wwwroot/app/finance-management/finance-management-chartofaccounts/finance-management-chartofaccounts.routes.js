"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const finance_management_chartofaccounts_list_component_1 = require("./finance-management-chartofaccounts-list/finance-management-chartofaccounts-list.component");
const finance_management_chartofaccounts_add_component_1 = require("./finance-management-chartofaccounts-add/finance-management-chartofaccounts-add.component");
const finance_management_chartofaccounts_edit_details_component_1 = require("./finance-management-chartofaccounts-edit-details/finance-management-chartofaccounts-edit-details.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const financeManagementChartOfAccountsRoutes = [
    {
        path: 'finance/chartofaccounts',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list', component: finance_management_chartofaccounts_list_component_1.ListFinanceManagementChartOfAccountsComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Finance, child: sidenav_model_1.UserGroupFeatureChildEnum.FinanceChartOfPayment, type: 'View' }
            },
            {
                path: 'add', component: finance_management_chartofaccounts_add_component_1.AddFinanceManagementChartOfAccountsComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Finance, child: sidenav_model_1.UserGroupFeatureChildEnum.FinanceChartOfPayment, type: 'Add' }
            },
            {
                path: ':id', component: finance_management_chartofaccounts_edit_details_component_1.EditDetailsFinanceManagementChartOfAccountsComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Finance, child: sidenav_model_1.UserGroupFeatureChildEnum.FinanceChartOfPayment, type: 'Edit' }
            }
        ]
    },
];
exports.FinanceManagementChartOfAccountsRouting = router_1.RouterModule.forRoot(financeManagementChartOfAccountsRoutes);
//# sourceMappingURL=finance-management-chartofaccounts.routes.js.map