import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';

import { FinanceManagementReceiptRouting } from './finance-management-receipt.routes';
import { FinanceManagementReceiptService } from './finance-management-receipt.service';

import { FinanceManagementReceiptComponent } from './finance-management-receipt.component';
import { ListFinanceManagementReceiptComponent } from './finance-management-receipt-list/finance-management-receipt-list.component';
import { AddFinanceManagementReceiptComponent } from './finance-management-receipt-add/finance-management-receipt-add.component';
import { EditDetailsFinanceManagementReceiptComponent } from './finance-management-receipt-edit-details/finance-management-receipt-edit-details.component';

@NgModule({
    imports: [
        SharedModule,
        FinanceManagementReceiptRouting
    ],
    declarations: [
        FinanceManagementReceiptComponent,
        ListFinanceManagementReceiptComponent,
        AddFinanceManagementReceiptComponent,
        EditDetailsFinanceManagementReceiptComponent
    ],
    providers: [
        FinanceManagementReceiptService
    ],
})
export class FinanceManagementReceiptModule { }
