import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StudentAttendanceManagementRouting } from './student-management-attendance.routes';
import { StudentAttendanceManagementComponent } from './student-management-attendance.component';
import { StudentAttendanceManagementService } from './student-management-attendance.service';

@NgModule({
  imports: [
    SharedModule,
    StudentAttendanceManagementRouting,
  ],
  declarations: [
    StudentAttendanceManagementComponent
  ],
  providers: [
    StudentAttendanceManagementService
  ],
})
export class StudentAttendanceManagementModule { }
