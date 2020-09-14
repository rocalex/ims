import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentFeeManagementStudentFeeComponent } from './student-fee-management-studentfee.component';
import { StudentFeeManagementStudentFeeService } from './student-fee-management-studentfee.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    StudentFeeManagementStudentFeeComponent
  ],
  providers: [
    StudentFeeManagementStudentFeeService
  ]
})
export class StudentFeeManagementStudentFeeModule { }
