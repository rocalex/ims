import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StudentManagementMarkRoutes } from './student-management-mark.routes';
import { StudentManagementMarkComponent } from './student-management-mark.component';
import { StudentManagementExamDefinitionModule } from './student-management-examdefinition/student-management-examdefinition.module';
import { StudentManagementClassExamModule } from './student-management-classexam/student-management-classexam.module';
import { StudentManagementExamScoreEntryModule } from './student-management-mark-examscoreentry/student-management-mark-examscoreentry.module';

@NgModule({
  imports: [
    SharedModule,
    StudentManagementMarkRoutes,
    StudentManagementExamDefinitionModule,
    StudentManagementClassExamModule,
    StudentManagementExamScoreEntryModule
  ],
  declarations: [
    StudentManagementMarkComponent
  ],
  providers: [
  ],
})
export class StudentManagementMarkModule { }
