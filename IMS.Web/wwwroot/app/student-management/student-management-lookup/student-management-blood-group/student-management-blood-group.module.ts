import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { BloodGroupManagementRouting } from './student-management-blood-group.routes';
import { BloodGroupManagementComponent } from './student-management-blood-group.component';
import { ListBloodGroupManagementComponent } from './student-management-blood-group-list/student-management-blood-group-list.component';
import { AddBloodGroupManagementComponent } from './student-management-blood-group-add/student-management-blood-group-add.component';
import { EditAndDetailBloodGroupManagementComponent } from './student-management-blood-group-edit-detail/student-management-blood-group-edit-detail.component';
import { BloodGroupManagementService } from './student-management-blood-group.service';

@NgModule({
  imports: [
    SharedModule,
    //BloodGroupManagementRouting
  ],
  declarations: [
    BloodGroupManagementComponent,
    ListBloodGroupManagementComponent,
    AddBloodGroupManagementComponent,
    EditAndDetailBloodGroupManagementComponent
  ],
  providers: [
    BloodGroupManagementService
  ],
})
export class BloodGroupManagementModule { }
