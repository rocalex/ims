import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { SectionManagementComponent } from './student-management-section.component';
import { ListSectionManagementComponent } from './student-management-section-list/student-management-section-list.component';
import { AddSectionManagementComponent } from './student-management-section-add/student-management-section-add.component';
import { EditAndDetailSectionManagementComponent } from './student-management-section-edit-detail/student-management-section-edit-detail.component';
import { SectionManagementService } from './student-management-section.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SectionManagementComponent,
    ListSectionManagementComponent,
    AddSectionManagementComponent,
    EditAndDetailSectionManagementComponent
  ],
  providers: [
    SectionManagementService
  ],
})
export class SectionManagementModule { }
