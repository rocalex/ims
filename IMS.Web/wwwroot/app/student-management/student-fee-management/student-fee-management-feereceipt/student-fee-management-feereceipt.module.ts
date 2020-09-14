import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentFeeManagementFeeReceiptService } from './student-fee-management-feereceipt.service';
import { StudentFeeManagementFeeReceiptComponent } from './student-fee-management-feereceipt.component';
import { AddStudentFeeManagementFeeReceiptComponent } from './student-fee-management-feereceipt-add/student-fee-management-feereceipt-add.component';
import { EditAndDetailStudentFeeManagementFeeReceiptComponent } from './student-fee-management-feereceipt-edit-detail/student-fee-management-feereceipt-edit-detail.component';
import { ListStudentFeeManagementFeeReceiptComponent } from './student-fee-management-feereceipt-list/student-fee-management-feereceipt-list.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    StudentFeeManagementFeeReceiptComponent,
    AddStudentFeeManagementFeeReceiptComponent,
    EditAndDetailStudentFeeManagementFeeReceiptComponent,
    ListStudentFeeManagementFeeReceiptComponent
  ],
  providers: [
    StudentFeeManagementFeeReceiptService
  ]
})
export class StudentFeeManagementFeeReceiptModule { }
