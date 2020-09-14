"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const studentManagementRoutes = [
    {
        path: 'student',
        children: [
            { path: '', redirectTo: 'nationality', pathMatch: 'full' }
        ]
    },
];
exports.StudentManagementRouting = router_1.RouterModule.forRoot(studentManagementRoutes);
//# sourceMappingURL=student-management.routes.js.map