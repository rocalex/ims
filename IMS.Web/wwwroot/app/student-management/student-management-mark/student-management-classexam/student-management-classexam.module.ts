import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentManagementClassExamComponent } from './student-management-classexam.component';
import { StudentManagementClassExamService } from './student-management-classexam.service';
import { AddStudentManagementClassExamComponent } from './student-management-classexam-add/student-management-classexam-add.component';
import { EditAndDetailStudentManagementClassExamComponent } from './student-management-classexam-edit-detail/student-management-classexam-edit-detail.component';
import { ListStudentManagementClassExamComponent } from './student-management-classexam-list/student-management-classexam-list.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    StudentManagementClassExamComponent,
    AddStudentManagementClassExamComponent,
    EditAndDetailStudentManagementClassExamComponent,
    ListStudentManagementClassExamComponent
  ],
  providers: [
    StudentManagementClassExamService
  ],
})
export class StudentManagementClassExamModule { }
