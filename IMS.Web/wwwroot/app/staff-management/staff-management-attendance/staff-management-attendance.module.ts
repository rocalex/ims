import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StaffAttendanceManagementRouting } from './staff-management-attendance.routes';
import { StaffAttendanceManagementComponent } from './staff-management-attendance.component';
import { StaffAttendanceManagementService } from './staff-management-attendance.service';

@NgModule({
  imports: [
    SharedModule,
    StaffAttendanceManagementRouting,
  ],
  declarations: [
    StaffAttendanceManagementComponent
  ],
  providers: [
    StaffAttendanceManagementService
  ],
})
export class StaffAttendanceManagementModule { }
