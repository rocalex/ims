"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const user_profile_component_1 = require("./user-profile.component");
const userProfileManagementRoutes = [
    { path: 'profile', component: user_profile_component_1.UserProfileComponent },
];
exports.UserProfileManagementRouting = router_1.RouterModule.forRoot(userProfileManagementRoutes);
//# sourceMappingURL=user-profile.routes.js.map