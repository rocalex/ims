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
const http_1 = require("@angular/http");
const animations_1 = require("@angular/platform-browser/animations");
const app_user_component_1 = require("./app-user.component");
const shared_module_1 = require("../shared/shared.module");
const app_user_routes_1 = require("./app-user.routes");
const http_service_1 = require("../core/http.service");
const app_user_service_1 = require("./app-user.service");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const homework_module_1 = require("./homework/homework.module");
const staff_management_disciplinary_module_1 = require("./staff-management-disciplinary/staff-management-disciplinary.module");
const notification_service_1 = require("../shared/notification.service");
const user_profile_module_1 = require("./user-profile/user-profile.module");
const change_password_module_1 = require("./change-password/change-password.module");
const notification_management_module_1 = require("./notification-management/notification-management.module");
const student_management_leave_module_1 = require("./student-management-leave/student-management-leave.module");
const staff_management_leave_module_1 = require("./staff-management-leave/staff-management-leave.module");
let UserAppModule = class UserAppModule {
};
UserAppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_user_component_1.UserAppComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            animations_1.BrowserAnimationsModule,
            shared_module_1.SharedModule,
            app_user_routes_1.UserAppRouting,
            dashboard_module_1.DashboardModule,
            homework_module_1.HomeworkModule,
            staff_management_disciplinary_module_1.StaffDisciplinaryManagementModule,
            user_profile_module_1.UserProfileModule,
            change_password_module_1.ChangePasswordModule,
            notification_management_module_1.NotificationManagementModule,
            student_management_leave_module_1.StudentLeaveManagementModule,
            staff_management_leave_module_1.StaffLeaveManagementModule
        ],
        providers: [http_service_1.HttpService, app_user_service_1.AppUserService, notification_service_1.NotificationManagementService],
        bootstrap: [app_user_component_1.UserAppComponent]
    })
], UserAppModule);
exports.UserAppModule = UserAppModule;
//# sourceMappingURL=app-user.module.js.map