import { Routes, RouterModule } from '@angular/router';

import { ListFinanceManagementReceiptComponent } from './finance-management-receipt-list/finance-management-receipt-list.component';
import { AddFinanceManagementReceiptComponent } from './finance-management-receipt-add/finance-management-receipt-add.component';
import { EditDetailsFinanceManagementReceiptComponent } from './finance-management-receipt-edit-details/finance-management-receipt-edit-details.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const financeManagementReceiptRoutes: Routes = [
  {
    path: 'finance/receipt',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: ListFinanceManagementReceiptComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Finance, child: UserGroupFeatureChildEnum.FinanceBasicReciept, type: 'View' }
      },
      {
        path: 'add', component: AddFinanceManagementReceiptComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Finance, child: UserGroupFeatureChildEnum.FinanceBasicReciept, type: 'Add' }
      },
      {
        path: ':id', component: EditDetailsFinanceManagementReceiptComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Finance, child: UserGroupFeatureChildEnum.FinanceBasicReciept, type: 'Edit' }
      }
    ]
  },

];
export const FinanceManagementReceiptRouting = RouterModule.forRoot(financeManagementReceiptRoutes);