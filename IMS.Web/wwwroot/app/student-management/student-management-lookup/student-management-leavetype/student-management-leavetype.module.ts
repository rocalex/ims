import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { LeaveTypeManagementComponent } from './student-management-leavetype.component';
import { ListLeaveTypeManagementComponent } from './student-management-leavetype-list/student-management-leavetype-list.component';
import { AddLeaveTypeManagementComponent } from './student-management-leavetype-add/student-management-leavetype-add.component';
import { EditAndDetailLeaveTypeManagementComponent } from './student-management-leavetype-edit-detail/student-management-leavetype-edit-detail.component';
import { LeaveTypeManagementService } from './student-management-leavetype.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LeaveTypeManagementComponent,
    ListLeaveTypeManagementComponent,
    AddLeaveTypeManagementComponent,
    EditAndDetailLeaveTypeManagementComponent
  ],
  providers: [
    LeaveTypeManagementService
  ],
})
export class LeaveTypeManagementModule { }
