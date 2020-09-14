import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { InstituteManagementService } from './institute-management.service';
import { InstituteManagementComponent } from './institute-management.component';
import { InstituteManagementRouting } from './institute-management.routes';
import { InstituteManagementListComponent } from './institute-management-list/institute-management-list.component';
import { InstituteManagementAddComponent } from './institute-management-add/institute-management-add.component';
import { InstituteManagementEditComponent } from './institute-management-edit/institute-management-edit.component';

@NgModule({
  imports: [
    SharedModule,
    InstituteManagementRouting
  ],
  declarations: [
    InstituteManagementComponent,
    InstituteManagementAddComponent,
    InstituteManagementListComponent,
    InstituteManagementEditComponent
  ],
  providers: [
    InstituteManagementService
  ],
})
export class InstituteManagementModule { }
