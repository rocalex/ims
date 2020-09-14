import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { MaritalStatusManagementRouting } from './student-management-maritalstatus.routes';
import { MaritalStatusManagementComponent } from './student-management-maritalstatus.component';
import { ListMaritalStatusManagementComponent } from './student-management-maritalstatus-list/student-management-maritalstatus-list.component';
import { AddMaritalStatusManagementComponent } from './student-management-maritalstatus-add/student-management-maritalstatus-add.component';
import { EditAndDetailMaritalStatusManagementComponent } from './student-management-maritalstatus-edit-detail/student-management-maritalstatus-edit-detail.component';
import { MaritalStatusManagementService } from './student-management-maritalstatus.service';

@NgModule({
  imports: [
    SharedModule,
    //MaritalStatusManagementRouting
  ],
  declarations: [
    MaritalStatusManagementComponent,
    ListMaritalStatusManagementComponent,
    AddMaritalStatusManagementComponent,
    EditAndDetailMaritalStatusManagementComponent
  ],
  providers: [
    MaritalStatusManagementService
  ],
})
export class MaritalStatusManagementModule { }
