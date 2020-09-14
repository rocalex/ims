import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StaffManagementInformationRouting } from './staff-management-information.routes';
import { StaffManagementInformationComponent } from './staff-management-information.component';
import { AddStaffManagementInformationComponent } from './staff-management-information-add/staff-management-information-add.component';
import { EditAndDetailStaffManagementInformationComponent } from './staff-management-information-edit-detail/staff-management-information-edit-detail.component';
import { ListStaffManagementInformationComponent } from './staff-management-information-list/staff-management-information-list.component';
import { StaffManagementService } from './staff-management-information.service';

@NgModule({
  imports: [
    SharedModule,
    StaffManagementInformationRouting
  ],
  declarations: [
    StaffManagementInformationComponent,
    AddStaffManagementInformationComponent,
    EditAndDetailStaffManagementInformationComponent,
    ListStaffManagementInformationComponent
  ],
  providers: [
    StaffManagementService
  ],
})
export class StaffManagementInformationModule { }
