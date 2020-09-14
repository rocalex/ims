import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';

import { FinanceManagementChartOfAccountsRouting } from './finance-management-chartofaccounts.routes';
import { FinanceManagementChartOfAccountsService } from './finance-management-chartofaccounts.service';

import { FinanceManagementChartOfAccountsComponent } from './finance-management-chartofaccounts.component';
import { ListFinanceManagementChartOfAccountsComponent } from './finance-management-chartofaccounts-list/finance-management-chartofaccounts-list.component';
import { AddFinanceManagementChartOfAccountsComponent } from './finance-management-chartofaccounts-add/finance-management-chartofaccounts-add.component';
import { EditDetailsFinanceManagementChartOfAccountsComponent } from './finance-management-chartofaccounts-edit-details/finance-management-chartofaccounts-edit-details.component';

@NgModule({
    imports: [
        SharedModule,
        FinanceManagementChartOfAccountsRouting
    ],
    declarations: [
        FinanceManagementChartOfAccountsComponent,
        ListFinanceManagementChartOfAccountsComponent,
        AddFinanceManagementChartOfAccountsComponent,
        EditDetailsFinanceManagementChartOfAccountsComponent
    ],
    providers: [
        FinanceManagementChartOfAccountsService
    ],
})
export class FinanceManagementChartOfAccountsModule { }
