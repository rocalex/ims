import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { TeachingStaffManagementComponent } from './student-management-teachingstaff.component';
import { ListTeachingStaffManagementComponent } from './student-management-teachingstaff-list/student-management-teachingstaff-list.component';
import { TeachingStaffManagementService } from './student-management-teachingstaff.service';
import { AddTeachingStaffManagementComponent } from './student-management-teachingstaff-add/student-management-teachingstaff-add.component';
import { EditAndDetailTeachingStaffManagementComponent } from './student-management-teachingstaff-edit-detail/student-management-teachingstaff-edit-detail.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    TeachingStaffManagementComponent,
    ListTeachingStaffManagementComponent,
    AddTeachingStaffManagementComponent,
    EditAndDetailTeachingStaffManagementComponent
  ],
  providers: [
    TeachingStaffManagementService
  ],
})
export class TeachingStaffManagementModule { }
