"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const user_list_component_1 = require("./user-list/user-list.component");
const user_add_component_1 = require("./user-add/user-add.component");
const user_edit_details_component_1 = require("./user-edit-details/user-edit-details.component");
const userRoutes = [
    {
        path: 'usermanagement/user',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: user_list_component_1.UserListComponent },
            { path: 'add', component: user_add_component_1.UserAddComponent },
            { path: ':id', component: user_edit_details_component_1.UserEditDetailsComponent }
        ]
    },
];
exports.UserRouting = router_1.RouterModule.forRoot(userRoutes);
//# sourceMappingURL=user.routes.js.map