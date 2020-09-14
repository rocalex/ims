"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const finance_management_receipt_list_component_1 = require("./finance-management-receipt-list/finance-management-receipt-list.component");
const finance_management_receipt_add_component_1 = require("./finance-management-receipt-add/finance-management-receipt-add.component");
const finance_management_receipt_edit_details_component_1 = require("./finance-management-receipt-edit-details/finance-management-receipt-edit-details.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const financeManagementReceiptRoutes = [
    {
        path: 'finance/receipt',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list', component: finance_management_receipt_list_component_1.ListFinanceManagementReceiptComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Finance, child: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept, type: 'View' }
            },
            {
                path: 'add', component: finance_management_receipt_add_component_1.AddFinanceManagementReceiptComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Finance, child: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept, type: 'Add' }
            },
            {
                path: ':id', component: finance_management_receipt_edit_details_component_1.EditDetailsFinanceManagementReceiptComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Finance, child: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept, type: 'Edit' }
            }
        ]
    },
];
exports.FinanceManagementReceiptRouting = router_1.RouterModule.forRoot(financeManagementReceiptRoutes);
//# sourceMappingURL=finance-management-receipt.routes.js.map