"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const staff_management_report_view_component_1 = require("./staff-management-report-view/staff-management-report-view.component");
const staff_management_report_list_component_1 = require("./staff-management-report-list/staff-management-report-list.component");
const staff_management_report_chart_component_1 = require("./staff-management-report-chart/staff-management-report-chart.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const staffManagementReportRoutes = [
    {
        path: 'staff/report',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list', component: staff_management_report_list_component_1.StaffManagementReportListComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffReport, type: 'View' }
            },
            {
                path: ':id', component: staff_management_report_view_component_1.StaffManagementReportViewComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffReport, type: 'View' }
            },
            {
                path: 'chart/:id', component: staff_management_report_chart_component_1.StaffManagementReportChartComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffReport, type: 'View' }
            }
        ]
    },
];
exports.StaffManagementReportRouting = router_1.RouterModule.forRoot(staffManagementReportRoutes);
//# sourceMappingURL=staff-management-report.routes.js.map