import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StudentLeaveManagementRouting } from './student-management-leave.routes';
import { StudentLeaveManagementComponent } from './student-management-leave.component';
import { StudentLeaveManagementService } from './student-management-leave.service';
import { AddStudentLeaveManagementComponent } from './student-management-leave-add/student-management-leave-add.component';
import { EditAndDetailStudentLeaveManagementComponent } from './student-management-leave-edit-detail/student-management-leave-edit-detail.component';
import { ListStudentLeaveManagementComponent } from './student-management-leave-list/student-management-leave-list.component';

@NgModule({
  imports: [
    SharedModule,
    StudentLeaveManagementRouting,
  ],
  declarations: [
    StudentLeaveManagementComponent,
    AddStudentLeaveManagementComponent,
    EditAndDetailStudentLeaveManagementComponent,
    ListStudentLeaveManagementComponent
  ],
  providers: [
    StudentLeaveManagementService
  ],
})
export class StudentLeaveManagementModule { }
