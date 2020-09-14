"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const routes = [
    {
        path: 'hostel',
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
];
exports.LibraryRouting = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=library.route.js.map