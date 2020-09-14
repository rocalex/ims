import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { ReligionManagementRouting } from './student-management-religion.routes';
import { ReligionManagementComponent } from './student-management-religion.component';
import { ListReligionManagementComponent } from './student-management-religion-list/student-management-religion-list.component';
import { AddReligionManagementComponent } from './student-management-religion-add/student-management-religion-add.component';
import { EditAndDetailReligionManagementComponent } from './student-management-religion-edit-detail/student-management-religion-edit-detail.component';
import { ReligionManagementService } from './student-management-religion.service';

@NgModule({
  imports: [
    SharedModule,
    //ReligionManagementRouting
  ],
  declarations: [
    ReligionManagementComponent,
    ListReligionManagementComponent,
    AddReligionManagementComponent,
    EditAndDetailReligionManagementComponent
  ],
  providers: [
    ReligionManagementService
  ],
})
export class ReligionManagementModule { }
