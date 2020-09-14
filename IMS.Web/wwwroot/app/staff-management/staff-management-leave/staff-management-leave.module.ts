import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StaffLeaveManagementRouting } from './staff-management-leave.routes';
import { StaffLeaveManagementComponent } from './staff-management-leave.component';
import { StaffLeaveManagementService } from './staff-management-leave.service';
import { AddStaffLeaveManagementComponent } from './staff-management-leave-add/staff-management-leave-add.component';
import { EditAndDetailStaffLeaveManagementComponent } from './staff-management-leave-edit-detail/staff-management-leave-edit-detail.component';
import { ListStaffLeaveManagementComponent } from './staff-management-leave-list/staff-management-leave-list.component';

@NgModule({
  imports: [
    SharedModule,
    StaffLeaveManagementRouting,
  ],
  declarations: [
    StaffLeaveManagementComponent,
    AddStaffLeaveManagementComponent,
    EditAndDetailStaffLeaveManagementComponent,
    ListStaffLeaveManagementComponent
  ],
  providers: [
    StaffLeaveManagementService
  ],
})
export class StaffLeaveManagementModule { }
