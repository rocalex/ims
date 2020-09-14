import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentManagementExamDefinitionComponent } from './student-management-examdefinition.component';
import { StudentManagementExamDefinitionService } from './student-management-examdefinition.service';
import { AddStudentManagementExamDefinitionComponent } from './student-management-examdefinition-add/student-management-examdefinition-add.component';
import { EditAndDetailStudentManagementExamDefinitionComponent } from './student-management-examdefinition-edit-detail/student-management-examdefinition-edit-detail.component';
import { ListStudentManagementExamDefinitionComponent } from './student-management-examdefinition-list/student-management-examdefinition-list.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    StudentManagementExamDefinitionComponent,
    AddStudentManagementExamDefinitionComponent,
    EditAndDetailStudentManagementExamDefinitionComponent,
    ListStudentManagementExamDefinitionComponent
  ],
  providers: [
    StudentManagementExamDefinitionService
  ],
})
export class StudentManagementExamDefinitionModule { }
