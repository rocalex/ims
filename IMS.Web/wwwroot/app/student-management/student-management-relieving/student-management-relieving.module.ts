import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StudentRelievingManagementRouting } from './student-management-relieving.routes';
import { StudentRelievingManagementComponent } from './student-management-relieving.component';
import { ListStudentRelievingManagementComponent } from './student-management-relieving-list/student-management-relieving-list.component';
import { AddStudentRelievingManagementComponent } from './student-management-relieving-add/student-management-relieving-add.component';
import { EditAndDetailStudentRelievingManagementComponent } from './student-management-relieving-edit-detail/student-management-relieving-edit-detail.component';
import { StudentRelievingManagementService } from './student-management-relieving.service';

@NgModule({
  imports: [
    SharedModule,
    StudentRelievingManagementRouting
  ],
  declarations: [
    StudentRelievingManagementComponent,
    ListStudentRelievingManagementComponent,
    AddStudentRelievingManagementComponent,
    EditAndDetailStudentRelievingManagementComponent
  ],
  providers: [
    StudentRelievingManagementService
  ],
})
export class StudentRelievingManagementModule { }
