"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const staff_management_activities_component_1 = require("./staff-management-activities.component");
const staff_management_activity_list_component_1 = require("./staff-management-activity/staff-management-activity-list/staff-management-activity-list.component");
const staff_management_activity_add_component_1 = require("./staff-management-activity/staff-management-activity-add/staff-management-activity-add.component");
const staff_management_activity_edit_details_component_1 = require("./staff-management-activity/staff-management-activity-edit-details/staff-management-activity-edit-details.component");
const staff_management_homework_component_1 = require("./staff-management-homework/staff-management-homework.component");
const staff_management_disciplinary_list_component_1 = require("./staff-management-disciplinary/staff-management-disciplinary-list/staff-management-disciplinary-list.component");
const staff_management_disciplinary_add_component_1 = require("./staff-management-disciplinary/staff-management-disciplinary-add/staff-management-disciplinary-add.component");
const staff_management_disciplinary_edit_component_1 = require("./staff-management-disciplinary/staff-management-disciplinary-edit-detail/staff-management-disciplinary-edit.component");
const staff_management_notice_list_component_1 = require("./staff-management-notice/staff-management-notice-list/staff-management-notice-list.component");
const staff_management_notice_add_component_1 = require("./staff-management-notice/staff-management-notice-add/staff-management-notice-add.component");
const staff_management_notice_edit_details_component_1 = require("./staff-management-notice/staff-management-notice-edit-details/staff-management-notice-edit-details.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const staffManagementActivitiesRoutes = [
    {
        path: 'staff/activities', component: staff_management_activities_component_1.StaffManagementActivitiesComponent,
        children: [
            {
                path: 'activity',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: staff_management_activity_list_component_1.ListStaffActivityManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffActivity, type: 'View' }
                    },
                    {
                        path: 'add', component: staff_management_activity_add_component_1.AddStaffActivityManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffActivity, type: 'Add' }
                    },
                    {
                        path: ':id', component: staff_management_activity_edit_details_component_1.EditDetailsStaffActivityManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.StaffActivity, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'homework', component: staff_management_homework_component_1.StaffManagementHomeworkComponent
            },
            {
                path: 'disciplinary',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: staff_management_disciplinary_list_component_1.ListStaffDisciplinaryManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.Disciplinary, type: 'View' }
                    },
                    {
                        path: 'add', component: staff_management_disciplinary_add_component_1.AddStaffDisciplinaryManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.Disciplinary, type: 'Add' }
                    },
                    {
                        path: ':id', component: staff_management_disciplinary_edit_component_1.EditAndDetailStaffDisciplinaryManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.Disciplinary, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'notice',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: staff_management_notice_list_component_1.ListNoticeManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.CircularNotice, type: 'View' }
                    },
                    {
                        path: 'add', component: staff_management_notice_add_component_1.AddNoticeManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.CircularNotice, type: 'Add' }
                    },
                    {
                        path: ':id', component: staff_management_notice_edit_details_component_1.EditDetailsNoticeManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Staff, child: sidenav_model_1.UserGroupFeatureChildEnum.CircularNotice, type: 'Edit' }
                    }
                ]
            }
        ]
    },
];
exports.StaffManagementActivitiesRouting = router_1.RouterModule.forRoot(staffManagementActivitiesRoutes);
//# sourceMappingURL=staff-management-activities.routes.js.map