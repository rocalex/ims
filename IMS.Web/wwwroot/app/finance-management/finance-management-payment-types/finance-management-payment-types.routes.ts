import { Routes, RouterModule } from '@angular/router';

import { ListFinanceManagementPaymentTypesComponent } from './finance-management-payment-types-list/finance-management-payment-types-list.component';
import { AddFinanceManagementPaymentTypesComponent } from './finance-management-payment-types-add/finance-management-payment-types-add.component';
import { EditDetailsFinanceManagementPaymentTypesComponent } from './finance-management-payment-types-edit-details/finance-management-payment-types-edit-details.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const financeManagementPaymentTypesRoutes: Routes = [
  {
    path: 'finance/paymenttypes',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: ListFinanceManagementPaymentTypesComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Finance, child: UserGroupFeatureChildEnum.FinancePaymentType, type: 'View' }
      },
      {
        path: 'add', component: AddFinanceManagementPaymentTypesComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Finance, child: UserGroupFeatureChildEnum.FinancePaymentType, type: 'Add' }
      },
      {
        path: ':id', component: EditDetailsFinanceManagementPaymentTypesComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Finance, child: UserGroupFeatureChildEnum.FinancePaymentType, type: 'Edit' }
      }
    ]
  },

];
export const FinanceManagementPaymentTypesRouting = RouterModule.forRoot(financeManagementPaymentTypesRoutes);