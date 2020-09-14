import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { NationalityManagementRouting } from './student-management-nationality.routes';
import { NationalityManagementComponent } from './student-management-nationality.component';
import { ListNationalityManagementComponent } from './student-management-nationality-list/student-management-nationality-list.component';
import { AddNationalityManagementComponent } from './student-management-nationality-add/student-management-nationality-add.component';
import { EditAndDetailNationalityManagementComponent } from './student-management-nationality-edit-detail/student-management-nationality-edit-detail.component';
import { NationalityManagementService } from './student-management-nationality.service';

@NgModule({
  imports: [
    SharedModule,
    //NationalityManagementRouting
  ],
  declarations: [
    NationalityManagementComponent,
    ListNationalityManagementComponent,
    AddNationalityManagementComponent,
    EditAndDetailNationalityManagementComponent
  ],
  providers: [
    NationalityManagementService
  ],
})
export class NationalityManagementModule { }
