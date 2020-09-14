"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_fee_management_component_1 = require("./student-fee-management.component");
// Fee Component
const student_management_fee_component_list_component_1 = require("./student-management-fee-component/student-management-fee-component-list/student-management-fee-component-list.component");
const student_management_fee_component_add_component_1 = require("./student-management-fee-component/student-management-fee-component-add/student-management-fee-component-add.component");
const student_management_fee_component_edit_details_component_1 = require("./student-management-fee-component/student-management-fee-component-edit-details/student-management-fee-component-edit-details.component");
// Course Fee Terms
const student_management_course_fee_term_component_1 = require("./student-management-course-fee-term/student-management-course-fee-term.component");
const student_management_course_fee_term_details_component_1 = require("./student-management-course-fee-term/student-management-course-fee-term-details/student-management-course-fee-term-details.component");
const student_fee_management_refund_list_component_1 = require("./student-fee-management-refund/student-fee-management-refund-list/student-fee-management-refund-list.component");
const student_fee_management_refund_add_component_1 = require("./student-fee-management-refund/student-fee-management-refund-add/student-fee-management-refund-add.component");
const student_fee_management_refund_edit_detail_component_1 = require("./student-fee-management-refund/student-fee-management-refund-edit-detail/student-fee-management-refund-edit-detail.component");
const student_fee_management_studentfee_component_1 = require("./student-fee-management-studentfee/student-fee-management-studentfee.component");
const student_fee_management_feereceipt_add_component_1 = require("./student-fee-management-feereceipt/student-fee-management-feereceipt-add/student-fee-management-feereceipt-add.component");
const student_fee_management_feereceipt_edit_detail_component_1 = require("./student-fee-management-feereceipt/student-fee-management-feereceipt-edit-detail/student-fee-management-feereceipt-edit-detail.component");
const student_fee_management_feereceipt_list_component_1 = require("./student-fee-management-feereceipt/student-fee-management-feereceipt-list/student-fee-management-feereceipt-list.component");
const student_fee_management_report_list_component_1 = require("./student-fee-management-report/student-fee-management-report-list/student-fee-management-report-list.component");
const student_fee_management_report_view_component_1 = require("./student-fee-management-report/student-fee-management-report-view/student-fee-management-report-view.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const studentFeeManagementRoutes = [
    {
        path: 'student/feemanagement', component: student_fee_management_component_1.StudentFeeManagementComponent,
        children: [
            {
                path: 'component',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_fee_component_list_component_1.ListFeeComponentManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentFeeComponent, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_fee_component_add_component_1.AddFeeComponentManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentFeeComponent, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_fee_component_edit_details_component_1.EditDetailsFeeComponentManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentFeeComponent, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'coursefeeterms',
                children: [
                    {
                        path: '', component: student_management_course_fee_term_component_1.CourseFeeTermManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentCourseFeeTerm, type: 'View' }
                    },
                    {
                        path: ':classId', component: student_management_course_fee_term_details_component_1.CourseFeeTermDetailsManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentCourseFeeTerm, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'refund',
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
            {
                path: 'studentfee', component: student_fee_management_studentfee_component_1.StudentFeeManagementStudentFeeComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentStudentFee, type: 'View' }
            },
            {
                path: 'report',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_fee_management_report_list_component_1.StudentFeeManagementReportListComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentFeeReport, type: 'View' }
                    },
                    {
                        path: ':id', component: student_fee_management_report_view_component_1.StudentFeeManagementReportViewComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentFeeReport, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'feereceipt',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_fee_management_feereceipt_list_component_1.ListStudentFeeManagementFeeReceiptComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentFeeReceipt, type: 'View' }
                    },
                    {
                        path: 'add', component: student_fee_management_feereceipt_add_component_1.AddStudentFeeManagementFeeReceiptComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentFeeReceipt, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_fee_management_feereceipt_edit_detail_component_1.EditAndDetailStudentFeeManagementFeeReceiptComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentFeeReceipt, type: 'Edit' }
                    }
                ]
            }
        ]
    },
];
exports.StudentFeeManagementRouting = router_1.RouterModule.forRoot(studentFeeManagementRoutes);
//# sourceMappingURL=student-fee-management.routes.js.map