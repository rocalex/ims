import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';

import { FinanceManagementPaymentsRouting } from './finance-management-payments.routes';
import { FinanceManagementPaymentsService } from './finance-management-payments.service';

import { FinanceManagementPaymentsComponent } from './finance-management-payments.component';
import { ListFinanceManagementPaymentsComponent } from './finance-management-payments-list/finance-management-payments-list.component';
import { AddFinanceManagementPaymentsComponent } from './finance-management-payments-add/finance-management-payments-add.component';
import { EditDetailsFinanceManagementPaymentsComponent } from './finance-management-payments-edit-details/finance-management-payments-edit-details.component';

@NgModule({
    imports: [
        SharedModule,
        FinanceManagementPaymentsRouting
    ],
    declarations: [
        FinanceManagementPaymentsComponent,
        ListFinanceManagementPaymentsComponent,
        AddFinanceManagementPaymentsComponent,
        EditDetailsFinanceManagementPaymentsComponent
    ],
    providers: [
        FinanceManagementPaymentsService
    ],
})
export class FinanceManagementPaymentsModule { }
