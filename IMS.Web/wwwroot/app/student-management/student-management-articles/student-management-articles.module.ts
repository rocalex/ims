import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { StudentManagementArticlesRouting } from './student-management-articles.routes';
import { StudentManagementArticlesComponent } from './student-management-articles.component';
import { StudentManagementArticlesService } from './student-management-articles.service';

@NgModule({
  imports: [
    SharedModule,
      StudentManagementArticlesRouting
  ],
  declarations: [
      StudentManagementArticlesComponent
  ],
  providers: [
      StudentManagementArticlesService
  ],
})
export class StudentManagementArticlesModule { }
