import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SharedModule } from '../shared/shared.module';
import { RoleManagementModule } from './role-management/role-management.module';
import { ChangePasswordModule } from './change-password/change-password.module';
import { AppRouting } from './app.routes';
import { HttpService } from '../core/http.service';
import { AcademicManagementModule } from './academic-management/academic-management.module';
import { StudentManagementModule } from './student-management/student-management.module';
import { PageTitleService } from '../shared/page-title';
import { UserManagementModule } from './user-management/user-management.module';
import { InstituteManagementModule } from './institute-management/institute-management.module';
import { StaffManagementModule } from './staff-management/staff-management.module';
import { AdministrationManagementModule } from './administration-management/administration.module';
import { AppService } from './app.service';
import { UserProfileModule } from './user-profile/user-profile.module';
import { SharedService } from '../shared/shared.service';
import { TransportManagementModule } from './transport-management/transport-management.module';
import { FinanceManagementModule } from './finance-management/finance-management.module';
import { HttpErrorInterceptor } from '../core/http-request.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { PrintService } from '../shared/print.service';
import { NotificationManagementModule } from './notification-management/notification-management.module';
import { NotificationManagementService } from '../shared/notification.service';
import { HostelManagementModule } from './hostel-management/hostel-management.module';
import { PayrollModule } from './payroll/payroll.module';
import { LibraryModule } from './library/library.module';
import { InventoryModule } from './inventory/inventory.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule,
        RoleManagementModule,
        ChangePasswordModule,
        AppRouting,
        AcademicManagementModule,
        StudentManagementModule,
        UserManagementModule,
        InstituteManagementModule,
        StaffManagementModule,
        AdministrationManagementModule,
        UserProfileModule,
        TransportManagementModule,
        FinanceManagementModule,
        AdminDashboardModule,
        NotificationManagementModule,
        HostelManagementModule,
        PayrollModule,
        LibraryModule,
        InventoryModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
        HttpService, PageTitleService, AppService, SharedService, PrintService, NotificationManagementService],
    bootstrap: [AppComponent]
})
export class AppModule { }
