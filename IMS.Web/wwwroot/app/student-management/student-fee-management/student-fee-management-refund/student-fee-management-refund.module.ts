import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentFeeManagementRefundComponent } from './student-fee-management-refund.component';
import { ListStudentFeeManagementRefundComponent } from './student-fee-management-refund-list/student-fee-management-refund-list.component';
import { AddStudentFeeManagementRefundComponent } from './student-fee-management-refund-add/student-fee-management-refund-add.component';
import { EditAndDetailStudentFeeManagementRefundComponent } from './student-fee-management-refund-edit-detail/student-fee-management-refund-edit-detail.component';
import { StudentFeeManagementRefundService } from './student-fee-management-refund.service';
import { StudentFeeManagementRefundRouting } from './student-fee-management-refund.routes';

@NgModule({
  imports: [
    SharedModule,
    //StudentFeeManagementRefundRouting
  ],
  declarations: [
    StudentFeeManagementRefundComponent,
    ListStudentFeeManagementRefundComponent,
    AddStudentFeeManagementRefundComponent,
    EditAndDetailStudentFeeManagementRefundComponent
  ],
  providers: [
    StudentFeeManagementRefundService
  ]
})
export class StudentFeeManagementRefundModule { }
