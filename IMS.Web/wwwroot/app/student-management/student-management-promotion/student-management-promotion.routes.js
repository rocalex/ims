"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_promotion_list_component_1 = require("./student-management-promotion-list/student-management-promotion-list.component");
const student_management_promotion_add_component_1 = require("./student-management-promotion-add/student-management-promotion-add.component");
const student_management_promotion_edit_detail_component_1 = require("./student-management-promotion-edit-detail/student-management-promotion-edit-detail.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const studentPromotionManagementRoutes = [
    {
        path: 'student/promotion',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list', component: student_management_promotion_list_component_1.ListStudentPromotionManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentPromotion, type: 'View' }
            },
            {
                path: 'add', component: student_management_promotion_add_component_1.AddStudentPromotionManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentPromotion, type: 'Add' }
            },
            {
                path: ':id', component: student_management_promotion_edit_detail_component_1.EditAndDetailStudentPromotionManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentPromotion, type: 'Edit' }
            }
        ]
    },
];
exports.StudentPromotionManagementRouting = router_1.RouterModule.forRoot(studentPromotionManagementRoutes);
//# sourceMappingURL=student-management-promotion.routes.js.map