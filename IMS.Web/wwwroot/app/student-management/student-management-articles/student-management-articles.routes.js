"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_articles_component_1 = require("./student-management-articles.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const studentManagementArticlesRoutes = [
    {
        path: 'student/articles',
        children: [
            {
                path: '', component: student_management_articles_component_1.StudentManagementArticlesComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentArticles, type: 'View' }
            }
        ]
    },
];
exports.StudentManagementArticlesRouting = router_1.RouterModule.forRoot(studentManagementArticlesRoutes);
//# sourceMappingURL=student-management-articles.routes.js.map