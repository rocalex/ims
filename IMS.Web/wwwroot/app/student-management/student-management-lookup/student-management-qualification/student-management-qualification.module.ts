import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { QualificationManagementRouting } from './student-management-qualification.routes';
import { QualificationManagementComponent } from './student-management-qualification.component';
import { ListQualificationManagementComponent } from './student-management-qualification-list/student-management-qualification-list.component';
import { AddQualificationManagementComponent } from './student-management-qualification-add/student-management-qualification-add.component';
import { EditAndDetailQualificationManagementComponent } from './student-management-qualification-edit-detail/student-management-qualification-edit-detail.component';
import { QualificationManagementService } from './student-management-qualification.service';

@NgModule({
  imports: [
    SharedModule,
    //QualificationManagementRouting
  ],
  declarations: [
    QualificationManagementComponent,
    ListQualificationManagementComponent,
    AddQualificationManagementComponent,
    EditAndDetailQualificationManagementComponent
  ],
  providers: [
    QualificationManagementService
  ],
})
export class QualificationManagementModule { }
