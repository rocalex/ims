import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { StudentManagementNotificationRouting } from './student-management-notification.routes';
import { StudentManagementNotificationComponent } from './student-management-notification.component';
import { StudentManagementNotificationService } from './student-management-notification.service';

@NgModule({
  imports: [
    SharedModule,
      StudentManagementNotificationRouting
  ],
  declarations: [
      StudentManagementNotificationComponent
  ],
  providers: [
      StudentManagementNotificationService
  ],
})
export class StudentManagementNotificationModule { }
