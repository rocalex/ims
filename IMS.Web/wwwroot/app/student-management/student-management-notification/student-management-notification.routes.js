"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_notification_component_1 = require("./student-management-notification.component");
const studentManagementNotificationRoutes = [
    {
        path: 'student/notification',
        children: [
            { path: ':id', component: student_management_notification_component_1.StudentManagementNotificationComponent }
        ]
    },
];
exports.StudentManagementNotificationRouting = router_1.RouterModule.forRoot(studentManagementNotificationRoutes);
//# sourceMappingURL=student-management-notification.routes.js.map