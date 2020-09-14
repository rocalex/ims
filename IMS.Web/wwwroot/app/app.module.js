"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_1 = require("@angular/platform-browser");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const animations_1 = require("@angular/platform-browser/animations");
const app_component_1 = require("./app.component");
const shared_module_1 = require("../shared/shared.module");
const role_management_module_1 = require("./role-management/role-management.module");
const change_password_module_1 = require("./change-password/change-password.module");
const app_routes_1 = require("./app.routes");
const http_service_1 = require("../core/http.service");
const academic_management_module_1 = require("./academic-management/academic-management.module");
const student_management_module_1 = require("./student-management/student-management.module");
const page_title_1 = require("../shared/page-title");
const user_management_module_1 = require("./user-management/user-management.module");
const institute_management_module_1 = require("./institute-management/institute-management.module");
const staff_management_module_1 = require("./staff-management/staff-management.module");
const administration_module_1 = require("./administration-management/administration.module");
const app_service_1 = require("./app.service");
const user_profile_module_1 = require("./user-profile/user-profile.module");
const shared_service_1 = require("../shared/shared.service");
const transport_management_module_1 = require("./transport-management/transport-management.module");
const finance_management_module_1 = require("./finance-management/finance-management.module");
const http_request_interceptor_1 = require("../core/http-request.interceptor");
const http_1 = require("@angular/common/http");
const admin_dashboard_module_1 = require("./admin-dashboard/admin-dashboard.module");
const print_service_1 = require("../shared/print.service");
const notification_management_module_1 = require("./notification-management/notification-management.module");
const notification_service_1 = require("../shared/notification.service");
const hostel_management_module_1 = require("./hostel-management/hostel-management.module");
const payroll_module_1 = require("./payroll/payroll.module");
const library_module_1 = require("./library/library.module");
const inventory_module_1 = require("./inventory/inventory.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpClientModule,
            animations_1.BrowserAnimationsModule,
            shared_module_1.SharedModule,
            role_management_module_1.RoleManagementModule,
            change_password_module_1.ChangePasswordModule,
            app_routes_1.AppRouting,
            academic_management_module_1.AcademicManagementModule,
            student_management_module_1.StudentManagementModule,
            user_management_module_1.UserManagementModule,
            institute_management_module_1.InstituteManagementModule,
            staff_management_module_1.StaffManagementModule,
            administration_module_1.AdministrationManagementModule,
            user_profile_module_1.UserProfileModule,
            transport_management_module_1.TransportManagementModule,
            finance_management_module_1.FinanceManagementModule,
            admin_dashboard_module_1.AdminDashboardModule,
            notification_management_module_1.NotificationManagementModule,
            hostel_management_module_1.HostelManagementModule,
            payroll_module_1.PayrollModule,
            library_module_1.LibraryModule,
            inventory_module_1.InventoryModule
        ],
        providers: [
            { provide: http_1.HTTP_INTERCEPTORS, useClass: http_request_interceptor_1.HttpErrorInterceptor, multi: true },
            http_service_1.HttpService, page_title_1.PageTitleService, app_service_1.AppService, shared_service_1.SharedService, print_service_1.PrintService, notification_service_1.NotificationManagementService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map