import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserAppComponent } from './app-user.component';
import { SharedModule } from '../shared/shared.module';
import { UserAppRouting } from './app-user.routes';
import { HttpService } from '../core/http.service';
import { AppUserService } from './app-user.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { HomeworkModule } from './homework/homework.module';
import { StaffDisciplinaryManagementModule } from './staff-management-disciplinary/staff-management-disciplinary.module';
import { NotificationManagementService } from '../shared/notification.service';
import { UserProfileModule } from './user-profile/user-profile.module';
import { ChangePasswordModule } from './change-password/change-password.module';
import { NotificationManagementModule } from './notification-management/notification-management.module';
import { StudentLeaveManagementModule } from './student-management-leave/student-management-leave.module';
import { StaffLeaveManagementModule } from './staff-management-leave/staff-management-leave.module';

@NgModule({
  declarations: [
    UserAppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    SharedModule,
    UserAppRouting,
    DashboardModule,
    HomeworkModule,
    StaffDisciplinaryManagementModule,
    UserProfileModule,
    ChangePasswordModule,
    NotificationManagementModule,
    StudentLeaveManagementModule,
    StaffLeaveManagementModule
  ],
  providers: [HttpService, AppUserService, NotificationManagementService],
  bootstrap: [UserAppComponent]
})
export class UserAppModule { }
