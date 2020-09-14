import { Routes, RouterModule } from '@angular/router';

import { ListFinanceManagementPaymentsComponent } from './finance-management-payments-list/finance-management-payments-list.component';
import { AddFinanceManagementPaymentsComponent } from './finance-management-payments-add/finance-management-payments-add.component';
import { EditDetailsFinanceManagementPaymentsComponent } from './finance-management-payments-edit-details/finance-management-payments-edit-details.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const financeManagementPaymentsRoutes: Routes = [
  {
    path: 'finance/payment',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: ListFinanceManagementPaymentsComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Finance, child: UserGroupFeatureChildEnum.FinanceBasicPayment, type: 'View' }
      },
      {
        path: 'add', component: AddFinanceManagementPaymentsComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Finance, child: UserGroupFeatureChildEnum.FinanceBasicPayment, type: 'Add' }
      },
      {
        path: ':id', component: EditDetailsFinanceManagementPaymentsComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Finance, child: UserGroupFeatureChildEnum.FinanceBasicPayment, type: 'Edit' }
      }
    ]
  },

];
export const FinanceManagementPaymentsRouting = RouterModule.forRoot(financeManagementPaymentsRoutes);