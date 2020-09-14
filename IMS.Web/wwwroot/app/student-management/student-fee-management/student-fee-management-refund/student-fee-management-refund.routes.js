"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_fee_management_refund_list_component_1 = require("./student-fee-management-refund-list/student-fee-management-refund-list.component");
const student_fee_management_refund_add_component_1 = require("./student-fee-management-refund-add/student-fee-management-refund-add.component");
const student_fee_management_refund_edit_detail_component_1 = require("./student-fee-management-refund-edit-detail/student-fee-management-refund-edit-detail.component");
const permissions_route_guard_1 = require("../../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
const studentFeeManagementRefundRoutes = [
    {
        path: 'student/feemanagement/refund',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list', component: student_fee_management_refund_list_component_1.ListStudentFeeManagementRefundComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentFeeRefund, type: 'View' }
            },
            {
                path: 'add', component: student_fee_management_refund_add_component_1.AddStudentFeeManagementRefundComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentFeeRefund, type: 'Add' }
            },
            {
                path: ':id', component: student_fee_management_refund_edit_detail_component_1.EditAndDetailStudentFeeManagementRefundComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentFeeRefund, type: 'Edit' }
            }
        ]
    },
];
exports.StudentFeeManagementRefundRouting = router_1.RouterModule.forRoot(studentFeeManagementRefundRoutes);
//# sourceMappingURL=student-fee-management-refund.routes.js.map