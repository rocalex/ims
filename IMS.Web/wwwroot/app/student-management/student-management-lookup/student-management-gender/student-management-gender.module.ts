import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { GenderManagementRouting } from './student-management-gender.routes';
import { GenderManagementComponent } from './student-management-gender.component';
import { ListGenderManagementComponent } from './student-management-gender-list/student-management-gender-list.component';
import { AddGenderManagementComponent } from './student-management-gender-add/student-management-gender-add.component';
import { EditAndDetailGenderManagementComponent } from './student-management-gender-edit-detail/student-management-gender-edit-detail.component';
import { GenderManagementService } from './student-management-gender.service';

@NgModule({
  imports: [
    SharedModule,
    //GenderManagementRouting
  ],
  declarations: [
    GenderManagementComponent,
    ListGenderManagementComponent,
    AddGenderManagementComponent,
    EditAndDetailGenderManagementComponent
  ],
  providers: [
    GenderManagementService
  ],
})
export class GenderManagementModule { }
