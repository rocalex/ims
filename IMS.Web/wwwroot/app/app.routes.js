"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const change_password_component_1 = require("./change-password/change-password.component");
const user_profile_component_1 = require("./user-profile/user-profile.component");
const notification_management_component_1 = require("./notification-management/notification-management.component");
const appRoutes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'changepassword', component: change_password_component_1.ChangePasswordComponent },
    { path: 'profile', component: user_profile_component_1.UserProfileComponent },
    { path: 'notifications', component: notification_management_component_1.NotificationManagementComponent }
];
exports.AppRouting = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map