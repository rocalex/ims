"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const finance_management_payment_types_list_component_1 = require("./finance-management-payment-types-list/finance-management-payment-types-list.component");
const finance_management_payment_types_add_component_1 = require("./finance-management-payment-types-add/finance-management-payment-types-add.component");
const finance_management_payment_types_edit_details_component_1 = require("./finance-management-payment-types-edit-details/finance-management-payment-types-edit-details.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const financeManagementPaymentTypesRoutes = [
    {
        path: 'finance/paymenttypes',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list', component: finance_management_payment_types_list_component_1.ListFinanceManagementPaymentTypesComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Finance, child: sidenav_model_1.UserGroupFeatureChildEnum.FinancePaymentType, type: 'View' }
            },
            {
                path: 'add', component: finance_management_payment_types_add_component_1.AddFinanceManagementPaymentTypesComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Finance, child: sidenav_model_1.UserGroupFeatureChildEnum.FinancePaymentType, type: 'Add' }
            },
            {
                path: ':id', component: finance_management_payment_types_edit_details_component_1.EditDetailsFinanceManagementPaymentTypesComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Finance, child: sidenav_model_1.UserGroupFeatureChildEnum.FinancePaymentType, type: 'Edit' }
            }
        ]
    },
];
exports.FinanceManagementPaymentTypesRouting = router_1.RouterModule.forRoot(financeManagementPaymentTypesRoutes);
//# sourceMappingURL=finance-management-payment-types.routes.js.map