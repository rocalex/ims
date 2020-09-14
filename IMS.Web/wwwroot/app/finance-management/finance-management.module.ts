import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { FinanceManagementRouting } from './finance-management.routes';

import { FinanceManagementComponent } from './finance-management.component';

import { FinanceManagementReceiptModule } from './finance-management-receipt/finance-management-receipt.module';
import { FinanceManagementChartOfAccountsModule } from './finance-management-chartofaccounts/finance-management-chartofaccounts.module';
import { FinanceManagementPaymentsModule } from './finance-management-payments/finance-management-payments.module';
import { FinanceManagementPaymentTypesModule } from './finance-management-payment-types/finance-management-payment-types.module';

@NgModule({
    imports: [
        SharedModule,
        FinanceManagementRouting,
        FinanceManagementReceiptModule,
        FinanceManagementChartOfAccountsModule,
        FinanceManagementPaymentsModule,
        FinanceManagementPaymentTypesModule
    ],
    declarations: [
        FinanceManagementComponent
    ],
    providers: [
    ],
})
export class FinanceManagementModule { }
