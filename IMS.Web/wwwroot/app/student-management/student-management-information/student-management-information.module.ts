import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StudentInformationManagementRouting } from './student-management-information.routes';
import { StudentInformationManagementComponent } from './student-management-information.component';
import { ListStudentInformationManagementComponent } from './student-management-information-list/student-management-information-list.component';
import { AddStudentInformationManagementComponent } from './student-management-information-add/student-management-information-add.component';
import { EditAndDetailStudentInformationManagementComponent } from './student-management-information-edit-detail/student-management-information-edit-detail.component';
import { StudentManagementService } from './student-management-information.service';
import { ClassListComponent } from './student-class-list/classlist.component';

@NgModule({
  imports: [
    SharedModule,
    StudentInformationManagementRouting
  ],
  declarations: [
    StudentInformationManagementComponent,
    ListStudentInformationManagementComponent,
    AddStudentInformationManagementComponent,
    EditAndDetailStudentInformationManagementComponent,
    ClassListComponent
  ],
  providers: [
    StudentManagementService
  ],
})
export class StudentInformationManagementModule { }
