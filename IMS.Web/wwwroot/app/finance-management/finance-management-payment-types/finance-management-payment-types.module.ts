import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';

import { FinanceManagementPaymentTypesRouting } from './finance-management-payment-types.routes';
import { FinanceManagementPaymentTypesService } from './finance-management-payment-types.service';

import { FinanceManagementPaymentTypesComponent } from './finance-management-payment-types.component';
import { ListFinanceManagementPaymentTypesComponent } from './finance-management-payment-types-list/finance-management-payment-types-list.component';
import { AddFinanceManagementPaymentTypesComponent } from './finance-management-payment-types-add/finance-management-payment-types-add.component';
import { EditDetailsFinanceManagementPaymentTypesComponent } from './finance-management-payment-types-edit-details/finance-management-payment-types-edit-details.component';

@NgModule({
    imports: [
        SharedModule,
        FinanceManagementPaymentTypesRouting
    ],
    declarations: [
        FinanceManagementPaymentTypesComponent,
        ListFinanceManagementPaymentTypesComponent,
        AddFinanceManagementPaymentTypesComponent,
        EditDetailsFinanceManagementPaymentTypesComponent
    ],
    providers: [
        FinanceManagementPaymentTypesService
    ],
})
export class FinanceManagementPaymentTypesModule { }
