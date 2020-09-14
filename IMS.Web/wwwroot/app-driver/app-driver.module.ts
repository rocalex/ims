import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DriverAppComponent } from './app-driver.component';
import { SharedModule } from '../shared/shared.module';
import { DriverAppRouting } from './app-driver.routes';
import { HttpService } from '../core/http.service';
import { AppDriverService } from './app-driver.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { NotificationManagementService } from '../shared/notification.service';
import { UserProfileModule } from './user-profile/user-profile.module';
import { ChangePasswordModule } from './change-password/change-password.module';
import { NotificationManagementModule } from './notification-management/notification-management.module';

@NgModule({
  declarations: [
    DriverAppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    SharedModule,
    DriverAppRouting,
    DashboardModule,
    UserProfileModule,
    ChangePasswordModule,
    NotificationManagementModule
  ],
  providers: [HttpService, AppDriverService, NotificationManagementService],
  bootstrap: [DriverAppComponent]
})
export class DriverAppModule { }
