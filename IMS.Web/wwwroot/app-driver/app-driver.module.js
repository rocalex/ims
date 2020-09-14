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
const app_driver_component_1 = require("./app-driver.component");
const shared_module_1 = require("../shared/shared.module");
const app_driver_routes_1 = require("./app-driver.routes");
const http_service_1 = require("../core/http.service");
const app_driver_service_1 = require("./app-driver.service");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const notification_service_1 = require("../shared/notification.service");
const user_profile_module_1 = require("./user-profile/user-profile.module");
const change_password_module_1 = require("./change-password/change-password.module");
const notification_management_module_1 = require("./notification-management/notification-management.module");
let DriverAppModule = class DriverAppModule {
};
DriverAppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_driver_component_1.DriverAppComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            animations_1.BrowserAnimationsModule,
            shared_module_1.SharedModule,
            app_driver_routes_1.DriverAppRouting,
            dashboard_module_1.DashboardModule,
            user_profile_module_1.UserProfileModule,
            change_password_module_1.ChangePasswordModule,
            notification_management_module_1.NotificationManagementModule
        ],
        providers: [http_service_1.HttpService, app_driver_service_1.AppDriverService, notification_service_1.NotificationManagementService],
        bootstrap: [app_driver_component_1.DriverAppComponent]
    })
], DriverAppModule);
exports.DriverAppModule = DriverAppModule;
//# sourceMappingURL=app-driver.module.js.map