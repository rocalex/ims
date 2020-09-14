import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { StaffManagementHomeworkComponent } from './staff-management-homework.component';
import { StaffManagementHomeworkService } from './staff-management-homework.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    StaffManagementHomeworkComponent
  ],
  providers: [
    StaffManagementHomeworkService
  ],
})
export class StaffManagementHomeworkModule { }
