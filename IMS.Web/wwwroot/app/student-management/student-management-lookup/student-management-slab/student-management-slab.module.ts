import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { SlabManagementComponent } from './student-management-slab.component';
import { ListSlabManagementComponent } from './student-management-slab-list/student-management-slab-list.component';
import { AddSlabManagementComponent } from './student-management-slab-add/student-management-slab-add.component';
import { EditAndDetailSlabManagementComponent } from './student-management-slab-edit-detail/student-management-slab-edit-detail.component';
import { SlabManagementService } from './student-management-slab.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SlabManagementComponent,
    ListSlabManagementComponent,
    AddSlabManagementComponent,
    EditAndDetailSlabManagementComponent
  ],
  providers: [
    SlabManagementService
  ],
})
export class SlabManagementModule { }
