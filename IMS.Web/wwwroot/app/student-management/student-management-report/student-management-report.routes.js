"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_report_view_component_1 = require("./student-management-report-view/student-management-report-view.component");
const student_management_report_list_component_1 = require("./student-management-report-list/student-management-report-list.component");
const student_management_report_chart_component_1 = require("./student-management-report-chart/student-management-report-chart.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const StudentManagementReportRoutes = [
    {
        path: 'student/report',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list', component: student_management_report_list_component_1.StudentManagementReportListComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentReport, type: 'View' }
            },
            {
                path: ':id', component: student_management_report_view_component_1.StudentManagementReportViewComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentReport, type: 'View' }
            },
            {
                path: 'chart/:id', component: student_management_report_chart_component_1.StudentManagementReportChartComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentReport, type: 'View' }
            }
        ]
    },
];
exports.StudentManagementReportRouting = router_1.RouterModule.forRoot(StudentManagementReportRoutes);
//# sourceMappingURL=student-management-report.routes.js.map