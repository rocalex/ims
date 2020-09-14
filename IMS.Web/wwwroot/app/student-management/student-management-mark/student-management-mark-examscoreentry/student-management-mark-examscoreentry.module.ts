import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentManagementExamScoreEntryComponent } from './student-management-mark-examscoreentry.component';
import { StudentManagementExamScoreEntryService } from './student-management-mark-examscoreentry.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    StudentManagementExamScoreEntryComponent
  ],
  providers: [
    StudentManagementExamScoreEntryService
  ],
})
export class StudentManagementExamScoreEntryModule { }
