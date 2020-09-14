import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { OccupationManagementRouting } from './student-management-occupation.routes';
import { OccupationManagementComponent } from './student-management-occupation.component';
import { ListOccupationManagementComponent } from './student-management-occupation-list/student-management-occupation-list.component';
import { AddOccupationManagementComponent } from './student-management-occupation-add/student-management-occupation-add.component';
import { EditAndDetailOccupationManagementComponent } from './student-management-occupation-edit-detail/student-management-occupation-edit-detail.component';
import { OccupationManagementService } from './student-management-occupation.service';

@NgModule({
  imports: [
    SharedModule,
    //OccupationManagementRouting
  ],
  declarations: [
    OccupationManagementComponent,
    ListOccupationManagementComponent,
    AddOccupationManagementComponent,
    EditAndDetailOccupationManagementComponent
  ],
  providers: [
    OccupationManagementService
  ],
})
export class OccupationManagementModule { }
