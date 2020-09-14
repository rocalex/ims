"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const institute_management_component_1 = require("./institute-management.component");
const institute_management_academic_year_list_component_1 = require("./institute-management-academic-year/institute-management-academic-year-list/institute-management-academic-year-list.component");
const institute_management_academic_year_add_component_1 = require("./institute-management-academic-year/institute-management-academic-year-add/institute-management-academic-year-add.component");
const institute_management_academic_year_edit_details_1 = require("./institute-management-academic-year/institute-management-academic-year-edit-details/institute-management-academic-year-edit-details");
const institute_management_class_list_component_1 = require("./institute-management-class/institute-management-class-list/institute-management-class-list.component");
const institute_management_class_add_component_1 = require("./institute-management-class/institute-management-class-add/institute-management-class-add.component");
const institute_management_class_edit_details_1 = require("./institute-management-class/institute-management-class-edit-details/institute-management-class-edit-details");
const institute_management_class_subject_mapping_list_component_1 = require("./institute-management-class-subject-mapping/institute-management-class-subject-mapping-list/institute-management-class-subject-mapping-list.component");
const institute_management_holiday_off_list_component_1 = require("./institute-management-holiday-off/institute-management-holiday-off-list/institute-management-holiday-off-list.component");
const institute_management_holiday_off_add_component_1 = require("./institute-management-holiday-off/institute-management-holiday-off-add/institute-management-holiday-off-add.component");
const institute_management_holiday_off_edit_details_component_1 = require("./institute-management-holiday-off/institute-management-holiday-off-edit-details/institute-management-holiday-off-edit-details.component");
const institute_management_subject_list_component_1 = require("./institute-management-subject/institute-management-subject-list/institute-management-subject-list.component");
const institute_management_subject_add_component_1 = require("./institute-management-subject/institute-management-subject-add/institute-management-subject-add.component");
const institute_management_subject_edit_details_1 = require("./institute-management-subject/institute-management-subject-edit-details/institute-management-subject-edit-details");
const institute_management_time_table_component_1 = require("./institute-management-time-table/institute-management-time-table.component");
const institute_management_time_table_generate_component_1 = require("./institute-management-time-table/institute-management-time-table-generate/institute-management-time-table-generate.component");
const institute_management_week_off_list_edit_component_1 = require("./institute-management-week-off/institute-management-week-off-list-edit/institute-management-week-off-list-edit.component");
const permissions_route_guard_1 = require("../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../shared/sidenav/sidenav.model");
const instituteManagementRoutes = [
    {
        path: 'institute', component: institute_management_component_1.InstituteManagementComponent,
        children: [
            {
                path: 'academicyear',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: institute_management_academic_year_list_component_1.ListAcademicYearManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.InstituteAcademicYear, type: 'View' }
                    },
                    {
                        path: 'add', component: institute_management_academic_year_add_component_1.AddAcademicYearManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.InstituteAcademicYear, type: 'Add' }
                    },
                    {
                        path: ':id', component: institute_management_academic_year_edit_details_1.EditDetailsAcademicYearManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.InstituteAcademicYear, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'class',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: institute_management_class_list_component_1.ListClassManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.InstituteClass, type: 'View' }
                    },
                    {
                        path: 'add', component: institute_management_class_add_component_1.AddClassManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.InstituteClass, type: 'Add' }
                    },
                    {
                        path: ':id', component: institute_management_class_edit_details_1.EditDetailsClassManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.InstituteClass, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'classsubject',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: institute_management_class_subject_mapping_list_component_1.ListClassSubjectMappingManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.InstituteClassSubjectMapping, type: 'View' }
                    }
                ]
            },
            {
                path: 'holiday',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: institute_management_holiday_off_list_component_1.ListHolidayOffManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.InstituteHolidayOff, type: 'View' }
                    },
                    {
                        path: 'list/:academicyearid', component: institute_management_holiday_off_list_component_1.ListHolidayOffManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.InstituteHolidayOff, type: 'View' }
                    },
                    {
                        path: 'add/:academicyearid', component: institute_management_holiday_off_add_component_1.AddHolidayOffManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.InstituteHolidayOff, type: 'Add' }
                    },
                    {
                        path: ':id', component: institute_management_holiday_off_edit_details_component_1.EditDetailsHolidayOffManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.InstituteHolidayOff, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'subject',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: institute_management_subject_list_component_1.ListSubjectManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.InstituteSubject, type: 'View' }
                    },
                    {
                        path: 'add', component: institute_management_subject_add_component_1.AddSubjectManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.InstituteSubject, type: 'Add' }
                    },
                    {
                        path: ':id', component: institute_management_subject_edit_details_1.EditDetailsSubjectManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.InstituteSubject, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'timetable',
                children: [
                    { path: '', component: institute_management_time_table_component_1.TimeTableManagementComponent },
                    {
                        path: 'generate/:classId/:sectionId', component: institute_management_time_table_generate_component_1.GenerateTimeTableManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.InstituteTimeTable, type: 'View' }
                    }
                ]
            },
            {
                path: 'weekoff',
                children: [
                    {
                        path: '', component: institute_management_week_off_list_edit_component_1.ListEditWeekOffManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Administration, child: sidenav_model_1.UserGroupFeatureChildEnum.InstituteWeekOff, type: 'View' }
                    }
                ]
            }
        ]
    },
];
exports.InstituteManagementRouting = router_1.RouterModule.forRoot(instituteManagementRoutes);
//# sourceMappingURL=institute-management.routes.js.map