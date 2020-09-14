import { Routes, RouterModule } from '@angular/router';

import { ListFinanceManagementChartOfAccountsComponent } from './finance-management-chartofaccounts-list/finance-management-chartofaccounts-list.component';
import { AddFinanceManagementChartOfAccountsComponent } from './finance-management-chartofaccounts-add/finance-management-chartofaccounts-add.component';
import { EditDetailsFinanceManagementChartOfAccountsComponent } from './finance-management-chartofaccounts-edit-details/finance-management-chartofaccounts-edit-details.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const financeManagementChartOfAccountsRoutes: Routes = [
    {
        path: 'finance/chartofaccounts',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListFinanceManagementChartOfAccountsComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Finance, child: UserGroupFeatureChildEnum.FinanceChartOfPayment, type: 'View' }
          },
          {
            path: 'add', component: AddFinanceManagementChartOfAccountsComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Finance, child: UserGroupFeatureChildEnum.FinanceChartOfPayment, type: 'Add' } },
          {
            path: ':id', component: EditDetailsFinanceManagementChartOfAccountsComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Finance, child: UserGroupFeatureChildEnum.FinanceChartOfPayment, type: 'Edit' } }
        ]
    },

];
export const FinanceManagementChartOfAccountsRouting = RouterModule.forRoot(financeManagementChartOfAccountsRoutes);