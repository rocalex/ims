import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StudentManagementInActiveRouting } from './student-management-inactive.routes';
import { StudentManagementInActiveComponent } from './student-management-inactive.component';
import { StudentManagementInActiveService } from './student-management-inactive.service';

@NgModule({
  imports: [
    SharedModule,
    StudentManagementInActiveRouting
  ],
  declarations: [
    StudentManagementInActiveComponent
  ],
  providers: [
    StudentManagementInActiveService
  ],
})
export class StudentManagementInActiveModule { }
