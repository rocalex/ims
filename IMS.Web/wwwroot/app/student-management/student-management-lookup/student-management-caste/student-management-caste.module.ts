import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { CasteManagementRouting } from './student-management-caste.routes';
import { CasteManagementComponent } from './student-management-caste.component';
import { ListCasteManagementComponent } from './student-management-caste-list/student-management-caste-list.component';
import { AddCasteManagementComponent } from './student-management-caste-add/student-management-caste-add.component';
import { EditAndDetailCasteManagementComponent } from './student-management-caste-edit-detail/student-management-caste-edit-detail.component';
import { CasteManagementService } from './student-management-caste.service';

@NgModule({
  imports: [
    SharedModule,
    //CasteManagementRouting
  ],
  declarations: [
    CasteManagementComponent,
    ListCasteManagementComponent,
    AddCasteManagementComponent,
    EditAndDetailCasteManagementComponent
  ],
  providers: [
    CasteManagementService
  ],
})
export class CasteManagementModule { }
