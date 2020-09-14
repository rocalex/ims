"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_lookup_component_1 = require("./student-management-lookup.component");
const student_management_caste_add_component_1 = require("./student-management-caste/student-management-caste-add/student-management-caste-add.component");
const student_management_caste_list_component_1 = require("./student-management-caste/student-management-caste-list/student-management-caste-list.component");
const student_management_caste_edit_detail_component_1 = require("./student-management-caste/student-management-caste-edit-detail/student-management-caste-edit-detail.component");
const student_management_blood_group_list_component_1 = require("./student-management-blood-group/student-management-blood-group-list/student-management-blood-group-list.component");
const student_management_blood_group_add_component_1 = require("./student-management-blood-group/student-management-blood-group-add/student-management-blood-group-add.component");
const student_management_blood_group_edit_detail_component_1 = require("./student-management-blood-group/student-management-blood-group-edit-detail/student-management-blood-group-edit-detail.component");
const student_management_gender_list_component_1 = require("./student-management-gender/student-management-gender-list/student-management-gender-list.component");
const student_management_gender_add_component_1 = require("./student-management-gender/student-management-gender-add/student-management-gender-add.component");
const student_management_gender_edit_detail_component_1 = require("./student-management-gender/student-management-gender-edit-detail/student-management-gender-edit-detail.component");
const student_management_level_list_component_1 = require("./student-management-level/student-management-level-list/student-management-level-list.component");
const student_management_level_add_component_1 = require("./student-management-level/student-management-level-add/student-management-level-add.component");
const student_management_level_edit_detail_component_1 = require("./student-management-level/student-management-level-edit-detail/student-management-level-edit-detail.component");
const student_management_mother_tongue_list_component_1 = require("./student-management-mother-tongue/student-management-mother-tongue-list/student-management-mother-tongue-list.component");
const student_management_mother_tongue_add_component_1 = require("./student-management-mother-tongue/student-management-mother-tongue-add/student-management-mother-tongue-add.component");
const student_management_mother_tongue_edit_details_component_1 = require("./student-management-mother-tongue/student-management-mother-tongue-edit-details/student-management-mother-tongue-edit-details.component");
const student_management_nationality_list_component_1 = require("./student-management-nationality/student-management-nationality-list/student-management-nationality-list.component");
const student_management_nationality_add_component_1 = require("./student-management-nationality/student-management-nationality-add/student-management-nationality-add.component");
const student_management_nationality_edit_detail_component_1 = require("./student-management-nationality/student-management-nationality-edit-detail/student-management-nationality-edit-detail.component");
const student_management_occupation_list_component_1 = require("./student-management-occupation/student-management-occupation-list/student-management-occupation-list.component");
const student_management_occupation_add_component_1 = require("./student-management-occupation/student-management-occupation-add/student-management-occupation-add.component");
const student_management_occupation_edit_detail_component_1 = require("./student-management-occupation/student-management-occupation-edit-detail/student-management-occupation-edit-detail.component");
const student_management_qualification_add_component_1 = require("./student-management-qualification/student-management-qualification-add/student-management-qualification-add.component");
const student_management_qualification_list_component_1 = require("./student-management-qualification/student-management-qualification-list/student-management-qualification-list.component");
const student_management_qualification_edit_detail_component_1 = require("./student-management-qualification/student-management-qualification-edit-detail/student-management-qualification-edit-detail.component");
const student_management_relationship_list_component_1 = require("./student-management-relationship/student-management-relationship-list/student-management-relationship-list.component");
const student_management_relationship_add_component_1 = require("./student-management-relationship/student-management-relationship-add/student-management-relationship-add.component");
const student_management_relationship_edit_detail_component_1 = require("./student-management-relationship/student-management-relationship-edit-detail/student-management-relationship-edit-detail.component");
const student_management_religion_list_component_1 = require("./student-management-religion/student-management-religion-list/student-management-religion-list.component");
const student_management_religion_add_component_1 = require("./student-management-religion/student-management-religion-add/student-management-religion-add.component");
const student_management_religion_edit_detail_component_1 = require("./student-management-religion/student-management-religion-edit-detail/student-management-religion-edit-detail.component");
const student_management_religion_category_list_component_1 = require("./student-management-religion-category/student-management-religion-category-list/student-management-religion-category-list.component");
const student_management_religion_category_add_component_1 = require("./student-management-religion-category/student-management-religion-category-add/student-management-religion-category-add.component");
const student_management_religion_category_edit_component_1 = require("./student-management-religion-category/student-management-religion-category-edit-detail/student-management-religion-category-edit.component");
const student_management_sport_detail_list_component_1 = require("./student-management-sport-detail/student-management-sport-detail-list/student-management-sport-detail-list.component");
const student_management_sport_detail_add_component_1 = require("./student-management-sport-detail/student-management-sport-detail-add/student-management-sport-detail-add.component");
const student_management_sport_detail_edit_detail_component_1 = require("./student-management-sport-detail/student-management-sport-detail-edit-detail/student-management-sport-detail-edit-detail.component");
const student_management_maritalstatus_list_component_1 = require("./student-management-maritalstatus/student-management-maritalstatus-list/student-management-maritalstatus-list.component");
const student_management_maritalstatus_add_component_1 = require("./student-management-maritalstatus/student-management-maritalstatus-add/student-management-maritalstatus-add.component");
const student_management_maritalstatus_edit_detail_component_1 = require("./student-management-maritalstatus/student-management-maritalstatus-edit-detail/student-management-maritalstatus-edit-detail.component");
const student_management_section_list_component_1 = require("./student-management-section/student-management-section-list/student-management-section-list.component");
const student_management_section_add_component_1 = require("./student-management-section/student-management-section-add/student-management-section-add.component");
const student_management_section_edit_detail_component_1 = require("./student-management-section/student-management-section-edit-detail/student-management-section-edit-detail.component");
const student_management_teachingstaff_list_component_1 = require("./student-management-teachingstaff/student-management-teachingstaff-list/student-management-teachingstaff-list.component");
const student_management_teachingstaff_add_component_1 = require("./student-management-teachingstaff/student-management-teachingstaff-add/student-management-teachingstaff-add.component");
const student_management_teachingstaff_edit_detail_component_1 = require("./student-management-teachingstaff/student-management-teachingstaff-edit-detail/student-management-teachingstaff-edit-detail.component");
const student_management_slab_list_component_1 = require("./student-management-slab/student-management-slab-list/student-management-slab-list.component");
const student_management_slab_add_component_1 = require("./student-management-slab/student-management-slab-add/student-management-slab-add.component");
const student_management_slab_edit_detail_component_1 = require("./student-management-slab/student-management-slab-edit-detail/student-management-slab-edit-detail.component");
const student_management_meetingagenda_list_component_1 = require("./student-management-meetingagenda/student-management-meetingagenda-list/student-management-meetingagenda-list.component");
const student_management_meetingagenda_add_component_1 = require("./student-management-meetingagenda/student-management-meetingagenda-add/student-management-meetingagenda-add.component");
const student_management_meetingagenda_edit_detail_component_1 = require("./student-management-meetingagenda/student-management-meetingagenda-edit-detail/student-management-meetingagenda-edit-detail.component");
const student_management_activitystatus_list_component_1 = require("./student-management-activitystatus/student-management-activitystatus-list/student-management-activitystatus-list.component");
const student_management_activitystatus_add_component_1 = require("./student-management-activitystatus/student-management-activitystatus-add/student-management-activitystatus-add.component");
const student_management_activitystatus_edit_detail_component_1 = require("./student-management-activitystatus/student-management-activitystatus-edit-detail/student-management-activitystatus-edit-detail.component");
const student_management_disciplinarystatus_list_component_1 = require("./student-management-disciplinarystatus/student-management-disciplinarystatus-list/student-management-disciplinarystatus-list.component");
const student_management_disciplinarystatus_add_component_1 = require("./student-management-disciplinarystatus/student-management-disciplinarystatus-add/student-management-disciplinarystatus-add.component");
const student_management_disciplinarystatus_edit_component_1 = require("./student-management-disciplinarystatus/student-management-disciplinarystatus-edit-detail/student-management-disciplinarystatus-edit.component");
const student_management_leavetype_list_component_1 = require("./student-management-leavetype/student-management-leavetype-list/student-management-leavetype-list.component");
const student_management_leavetype_add_component_1 = require("./student-management-leavetype/student-management-leavetype-add/student-management-leavetype-add.component");
const student_management_leavetype_edit_detail_component_1 = require("./student-management-leavetype/student-management-leavetype-edit-detail/student-management-leavetype-edit-detail.component");
const permissions_route_guard_1 = require("../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const student_management_language_list_component_1 = require("./student-management-language/student-management-language-list/student-management-language-list.component");
const student_management_language_add_component_1 = require("./student-management-language/student-management-language-add/student-management-language-add.component");
const student_management_language_edit_detail_component_1 = require("./student-management-language/student-management-language-edit-detail/student-management-language-edit-detail.component");
const studentManagementLookUpRoutes = [
    {
        path: 'student/lookup', component: student_management_lookup_component_1.StudentManagementLookUpComponent,
        children: [
            {
                path: 'bloodgroup',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_blood_group_list_component_1.ListBloodGroupManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_blood_group_add_component_1.AddBloodGroupManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_blood_group_edit_detail_component_1.EditAndDetailBloodGroupManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'caste',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_caste_list_component_1.ListCasteManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_caste_add_component_1.AddCasteManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_caste_edit_detail_component_1.EditAndDetailCasteManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'gender',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_gender_list_component_1.ListGenderManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_gender_add_component_1.AddGenderManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_gender_edit_detail_component_1.EditAndDetailGenderManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'level',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_level_list_component_1.ListLevelManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_level_add_component_1.AddLevelManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_level_edit_detail_component_1.EditAndDetailLevelManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'mothertongue',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_mother_tongue_list_component_1.ListMotherTongueManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_mother_tongue_add_component_1.AddMotherTongueManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_mother_tongue_edit_details_component_1.EditDetailsMotherTongueManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'nationality',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_nationality_list_component_1.ListNationalityManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_nationality_add_component_1.AddNationalityManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_nationality_edit_detail_component_1.EditAndDetailNationalityManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'occupation',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_occupation_list_component_1.ListOccupationManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_occupation_add_component_1.AddOccupationManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_occupation_edit_detail_component_1.EditAndDetailOccupationManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'qualification',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_qualification_list_component_1.ListQualificationManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_qualification_add_component_1.AddQualificationManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_qualification_edit_detail_component_1.EditAndDetailQualificationManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'relationship',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_relationship_list_component_1.ListRelationshipManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_relationship_add_component_1.AddRelationshipManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_relationship_edit_detail_component_1.EditAndDetailRelationshipManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'religion',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_religion_list_component_1.ListReligionManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_religion_add_component_1.AddReligionManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_religion_edit_detail_component_1.EditAndDetailReligionManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'religioncategory',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_religion_category_list_component_1.ListReligionCategoryManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_religion_category_add_component_1.AddReligionCategoryManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_religion_category_edit_component_1.EditAndDetailReligionCategoryManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'sportdetail',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_sport_detail_list_component_1.ListSportDetailManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_sport_detail_add_component_1.AddSportDetailManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_sport_detail_edit_detail_component_1.EditAndDetailSportDetailManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'maritalstatus',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_maritalstatus_list_component_1.ListMaritalStatusManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_maritalstatus_add_component_1.AddMaritalStatusManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_maritalstatus_edit_detail_component_1.EditAndDetailMaritalStatusManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'section',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_section_list_component_1.ListSectionManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_section_add_component_1.AddSectionManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_section_edit_detail_component_1.EditAndDetailSectionManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'teachingstaff',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_teachingstaff_list_component_1.ListTeachingStaffManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_teachingstaff_add_component_1.AddTeachingStaffManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_teachingstaff_edit_detail_component_1.EditAndDetailTeachingStaffManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'slab',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_slab_list_component_1.ListSlabManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_slab_add_component_1.AddSlabManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_slab_edit_detail_component_1.EditAndDetailSlabManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'meetingagenda',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_meetingagenda_list_component_1.ListMeetingAgendaManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_meetingagenda_add_component_1.AddMeetingAgendaManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_meetingagenda_edit_detail_component_1.EditAndDetailMeetingAgendaManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'activitystatus',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_activitystatus_list_component_1.ListActivityStatusManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_activitystatus_add_component_1.AddActivityStatusManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_activitystatus_edit_detail_component_1.EditAndDetailActivityStatusManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'disciplinarystatus',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_disciplinarystatus_list_component_1.ListDisciplinaryStatusManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_disciplinarystatus_add_component_1.AddDisciplinaryStatusManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_disciplinarystatus_edit_component_1.EditAndDetailDisciplinaryStatusManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'leavetype',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_leavetype_list_component_1.ListLeaveTypeManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_leavetype_add_component_1.AddLeaveTypeManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_leavetype_edit_detail_component_1.EditAndDetailLeaveTypeManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            },
            {
                path: 'language',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list', component: student_management_language_list_component_1.ListLanguageManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
                    },
                    {
                        path: 'add', component: student_management_language_add_component_1.AddLanguageManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
                    },
                    {
                        path: ':id', component: student_management_language_edit_detail_component_1.EditAndDetailLanguageManagementComponent, canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                        data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
                    }
                ]
            }
        ]
    },
];
exports.StudentManagementLookUpRouting = router_1.RouterModule.forRoot(studentManagementLookUpRoutes);
//# sourceMappingURL=student-management-lookup.routes.js.map