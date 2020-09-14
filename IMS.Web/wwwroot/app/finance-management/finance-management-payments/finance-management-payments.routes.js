"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const finance_management_payments_list_component_1 = require("./finance-management-payments-list/finance-management-payments-list.component");
const finance_management_payments_add_component_1 = require("./finance-management-payments-add/finance-management-payments-add.component");
const finance_management_payments_edit_details_component_1 = require("./finance-management-payments-edit-details/finance-management-payments-edit-details.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const financeManagementPaymentsRoutes = [
    {
        path: 'finance/payment',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list', component: finance_management_payments_list_component_1.ListFinanceManagementPaymentsComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Finance, child: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment, type: 'View' }
            },
            {
                path: 'add', component: finance_management_payments_add_component_1.AddFinanceManagementPaymentsComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Finance, child: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment, type: 'Add' }
            },
            {
                path: ':id', component: finance_management_payments_edit_details_component_1.EditDetailsFinanceManagementPaymentsComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Finance, child: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment, type: 'Edit' }
            }
        ]
    },
];
exports.FinanceManagementPaymentsRouting = router_1.RouterModule.forRoot(financeManagementPaymentsRoutes);
//# sourceMappingURL=finance-management-payments.routes.js.map