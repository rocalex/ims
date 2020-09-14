"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const user_profile_component_1 = require("./user-profile/user-profile.component");
const change_password_component_1 = require("./change-password/change-password.component");
const notification_management_component_1 = require("./notification-management/notification-management.component");
const userAppRoutes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'profile', component: user_profile_component_1.UserProfileComponent },
    { path: 'changepassword', component: change_password_component_1.ChangePasswordComponent },
    { path: 'notifications', component: notification_management_component_1.NotificationManagementComponent }
];
exports.UserAppRouting = router_1.RouterModule.forRoot(userAppRoutes);
//# sourceMappingURL=app-user.routes.js.map