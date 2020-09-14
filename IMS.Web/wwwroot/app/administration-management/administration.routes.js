"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const administration_component_1 = require("./administration.component");
const administration_email_configuration_list_component_1 = require("./administration-email-configuration/administration-email-configuration-list/administration-email-configuration-list.component");
const administration_email_configuration_add_component_1 = require("./administration-email-configuration/administration-email-configuration-add/administration-email-configuration-add.component");
const staff_management_department_edit_details_component_1 = require("../staff-management/staff-management-department/staff-management-department-edit-details/staff-management-department-edit-details.component");
const event_management_component_1 = require("./event-management/event-management.component");
const auto_sequence_component_1 = require("./auto-sequence/auto-sequence.component");
const event_management_info_list_component_1 = require("./event-management/event-management-info/event-management-info-list/event-management-info-list.component");
const event_management_info_add_component_1 = require("./event-management/event-management-info/event-management-info-add/event-management-info-add.component");
const event_management_info_edit_detail_component_1 = require("./event-management/event-management-info/event-management-info-edit-detail/event-management-info-edit-detail.component");
const event_management_report_component_1 = require("./event-management/event-management-report/event-management-report.component");
const sidenav_model_1 = require("../../shared/sidenav/sidenav.model");
const permissions_route_guard_1 = require("../../shared/permissions-route.guard");
const template_management_component_1 = require("./template-management/template-management.component");
const administrationManagementRoutes = [
    {
        path: 'administration', component: administration_component_1.AdministrationManagementComponent,
        children: [
            {
                path: 'emailconfiguration',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: administration_email_configuration_list_component_1.ListEmailConfigurationManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.AcademicEmail, type: 'View' }
                    },
                    {
                        path: 'add', component: administration_email_configuration_add_component_1.AddDepartmentManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.AcademicEmail, type: 'Add' }
                    },
                    {
                        path: ':id', component: staff_management_department_edit_details_component_1.EditDetailsDepartmentManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.AcademicEmail, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'event',
                children: [
                    {
                        path: '', component: event_management_component_1.EventManagementComponent,
                        children: [
                            {
                                path: 'info',
                                children: [
                                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                                    {
                                        path: 'list', component: event_management_info_list_component_1.ListEventManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.AcademicEvent, type: 'View' }
                                    },
                                    {
                                        path: 'add', component: event_management_info_add_component_1.AddEventManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.AcademicEvent, type: 'Add' }
                                    },
                                    {
                                        path: ':id', component: event_management_info_edit_detail_component_1.EditDetailEventManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.AcademicEvent, type: 'Edit' }
                                    }
                                ]
                            },
                            {
                                path: 'report',
                                children: [
                                    {
                                        path: '', component: event_management_report_component_1.EventManagementReportComponent
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                path: 'autosequence',
                children: [
                    {
                        path: '', component: auto_sequence_component_1.AutoSequenceManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.AcademicAutoSequence, type: 'View' }
                    }
                ]
            },
            {
                path: 'templates',
                children: [
                    {
                        path: '', component: template_management_component_1.TemplateManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.AcademicTemplates, type: 'View' }
                    },
                ]
            }
        ]
    },
];
exports.AdministrationManagementRouting = router_1.RouterModule.forRoot(administrationManagementRoutes);
//# sourceMappingURL=administration.routes.js.map