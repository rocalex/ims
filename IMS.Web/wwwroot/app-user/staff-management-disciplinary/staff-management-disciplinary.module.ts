import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StaffDisciplinaryManagementComponent } from './staff-management-disciplinary.component';
import { ListStaffDisciplinaryManagementComponent } from './staff-management-disciplinary-list/staff-management-disciplinary-list.component';
import { AddStaffDisciplinaryManagementComponent } from './staff-management-disciplinary-add/staff-management-disciplinary-add.component';
import { EditAndDetailStaffDisciplinaryManagementComponent } from './staff-management-disciplinary-edit-detail/staff-management-disciplinary-edit.component';
import { StaffDisciplinaryManagementService } from './staff-management-disciplinary.service';
import { DisciplinaryRoutes } from './staff-management-disciplinary.routes';

@NgModule({
  imports: [
    SharedModule,
    DisciplinaryRoutes
  ],
  declarations: [
    StaffDisciplinaryManagementComponent,
    ListStaffDisciplinaryManagementComponent,
    AddStaffDisciplinaryManagementComponent,
    EditAndDetailStaffDisciplinaryManagementComponent
  ],
  providers: [
    StaffDisciplinaryManagementService
  ],
})
export class StaffDisciplinaryManagementModule { }
