import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { StudentFeeManagementRouting } from './student-fee-management.routes';
import { StudentFeeManagementComponent } from './student-fee-management.component';
import { FeeComponentManagementModule } from './student-management-fee-component/student-management-fee-component.module';
import { CourseFeeTermsManagementModule } from './student-management-course-fee-term/student-management-course-fee-term.module';
import { StudentFeeManagementRefundModule } from './student-fee-management-refund/student-fee-management-refund.module';
import { StudentFeeManagementStudentFeeModule } from './student-fee-management-studentfee/student-fee-management-studentfee.module';
import { StudentFeeManagementReportModule } from './student-fee-management-report/student-fee-management-report.module';
import { StudentFeeManagementFeeReceiptModule } from './student-fee-management-feereceipt/student-fee-management-feereceipt.module';

@NgModule({
  imports: [
    SharedModule,
    StudentFeeManagementRouting,
    FeeComponentManagementModule,
    CourseFeeTermsManagementModule,
    StudentFeeManagementRefundModule,
    StudentFeeManagementStudentFeeModule,
    StudentFeeManagementReportModule,
    StudentFeeManagementFeeReceiptModule
  ],
  declarations: [
    StudentFeeManagementComponent
  ],
  providers: []
})
export class StudentFeeManagementModule { }
