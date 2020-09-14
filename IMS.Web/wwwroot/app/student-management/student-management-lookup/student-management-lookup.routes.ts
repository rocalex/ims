import { Routes, RouterModule } from '@angular/router';
import { StudentManagementLookUpComponent } from './student-management-lookup.component';
import { AddCasteManagementComponent } from './student-management-caste/student-management-caste-add/student-management-caste-add.component';
import { ListCasteManagementComponent } from './student-management-caste/student-management-caste-list/student-management-caste-list.component';
import { EditAndDetailCasteManagementComponent } from './student-management-caste/student-management-caste-edit-detail/student-management-caste-edit-detail.component';
import { ListBloodGroupManagementComponent } from './student-management-blood-group/student-management-blood-group-list/student-management-blood-group-list.component';
import { AddBloodGroupManagementComponent } from './student-management-blood-group/student-management-blood-group-add/student-management-blood-group-add.component';
import { EditAndDetailBloodGroupManagementComponent } from './student-management-blood-group/student-management-blood-group-edit-detail/student-management-blood-group-edit-detail.component';
import { ListGenderManagementComponent } from './student-management-gender/student-management-gender-list/student-management-gender-list.component';
import { AddGenderManagementComponent } from './student-management-gender/student-management-gender-add/student-management-gender-add.component';
import { EditAndDetailGenderManagementComponent } from './student-management-gender/student-management-gender-edit-detail/student-management-gender-edit-detail.component';
import { ListLevelManagementComponent } from './student-management-level/student-management-level-list/student-management-level-list.component';
import { AddLevelManagementComponent } from './student-management-level/student-management-level-add/student-management-level-add.component';
import { EditAndDetailLevelManagementComponent } from './student-management-level/student-management-level-edit-detail/student-management-level-edit-detail.component';
import { ListMotherTongueManagementComponent } from './student-management-mother-tongue/student-management-mother-tongue-list/student-management-mother-tongue-list.component';
import { AddMotherTongueManagementComponent } from './student-management-mother-tongue/student-management-mother-tongue-add/student-management-mother-tongue-add.component';
import { EditDetailsMotherTongueManagementComponent } from './student-management-mother-tongue/student-management-mother-tongue-edit-details/student-management-mother-tongue-edit-details.component';
import { ListNationalityManagementComponent } from './student-management-nationality/student-management-nationality-list/student-management-nationality-list.component';
import { AddNationalityManagementComponent } from './student-management-nationality/student-management-nationality-add/student-management-nationality-add.component';
import { EditAndDetailNationalityManagementComponent } from './student-management-nationality/student-management-nationality-edit-detail/student-management-nationality-edit-detail.component';
import { ListOccupationManagementComponent } from './student-management-occupation/student-management-occupation-list/student-management-occupation-list.component';
import { AddOccupationManagementComponent } from './student-management-occupation/student-management-occupation-add/student-management-occupation-add.component';
import { EditAndDetailOccupationManagementComponent } from './student-management-occupation/student-management-occupation-edit-detail/student-management-occupation-edit-detail.component';
import { AddQualificationManagementComponent } from './student-management-qualification/student-management-qualification-add/student-management-qualification-add.component';
import { ListQualificationManagementComponent } from './student-management-qualification/student-management-qualification-list/student-management-qualification-list.component';
import { EditAndDetailQualificationManagementComponent } from './student-management-qualification/student-management-qualification-edit-detail/student-management-qualification-edit-detail.component';
import { ListRelationshipManagementComponent } from './student-management-relationship/student-management-relationship-list/student-management-relationship-list.component';
import { AddRelationshipManagementComponent } from './student-management-relationship/student-management-relationship-add/student-management-relationship-add.component';
import { EditAndDetailRelationshipManagementComponent } from './student-management-relationship/student-management-relationship-edit-detail/student-management-relationship-edit-detail.component';
import { ListReligionManagementComponent } from './student-management-religion/student-management-religion-list/student-management-religion-list.component';
import { AddReligionManagementComponent } from './student-management-religion/student-management-religion-add/student-management-religion-add.component';
import { EditAndDetailReligionManagementComponent } from './student-management-religion/student-management-religion-edit-detail/student-management-religion-edit-detail.component';
import { ListReligionCategoryManagementComponent } from './student-management-religion-category/student-management-religion-category-list/student-management-religion-category-list.component';
import { AddReligionCategoryManagementComponent } from './student-management-religion-category/student-management-religion-category-add/student-management-religion-category-add.component';
import { EditAndDetailReligionCategoryManagementComponent } from './student-management-religion-category/student-management-religion-category-edit-detail/student-management-religion-category-edit.component';
import { ListSportDetailManagementComponent } from './student-management-sport-detail/student-management-sport-detail-list/student-management-sport-detail-list.component';
import { AddSportDetailManagementComponent } from './student-management-sport-detail/student-management-sport-detail-add/student-management-sport-detail-add.component';
import { EditAndDetailSportDetailManagementComponent } from './student-management-sport-detail/student-management-sport-detail-edit-detail/student-management-sport-detail-edit-detail.component';
import { ListMaritalStatusManagementComponent } from './student-management-maritalstatus/student-management-maritalstatus-list/student-management-maritalstatus-list.component';
import { AddMaritalStatusManagementComponent } from './student-management-maritalstatus/student-management-maritalstatus-add/student-management-maritalstatus-add.component';
import { EditAndDetailMaritalStatusManagementComponent } from './student-management-maritalstatus/student-management-maritalstatus-edit-detail/student-management-maritalstatus-edit-detail.component';
import { ListSectionManagementComponent } from './student-management-section/student-management-section-list/student-management-section-list.component';
import { AddSectionManagementComponent } from './student-management-section/student-management-section-add/student-management-section-add.component';
import { EditAndDetailSectionManagementComponent } from './student-management-section/student-management-section-edit-detail/student-management-section-edit-detail.component';
import { ListTeachingStaffManagementComponent } from './student-management-teachingstaff/student-management-teachingstaff-list/student-management-teachingstaff-list.component';
import { AddTeachingStaffManagementComponent } from './student-management-teachingstaff/student-management-teachingstaff-add/student-management-teachingstaff-add.component';
import { EditAndDetailTeachingStaffManagementComponent } from './student-management-teachingstaff/student-management-teachingstaff-edit-detail/student-management-teachingstaff-edit-detail.component';
import { ListSlabManagementComponent } from './student-management-slab/student-management-slab-list/student-management-slab-list.component';
import { AddSlabManagementComponent } from './student-management-slab/student-management-slab-add/student-management-slab-add.component';
import { EditAndDetailSlabManagementComponent } from './student-management-slab/student-management-slab-edit-detail/student-management-slab-edit-detail.component';
import { ListMeetingAgendaManagementComponent } from './student-management-meetingagenda/student-management-meetingagenda-list/student-management-meetingagenda-list.component';
import { AddMeetingAgendaManagementComponent } from './student-management-meetingagenda/student-management-meetingagenda-add/student-management-meetingagenda-add.component';
import { EditAndDetailMeetingAgendaManagementComponent } from './student-management-meetingagenda/student-management-meetingagenda-edit-detail/student-management-meetingagenda-edit-detail.component';

import { ListActivityStatusManagementComponent } from './student-management-activitystatus/student-management-activitystatus-list/student-management-activitystatus-list.component';
import { AddActivityStatusManagementComponent } from './student-management-activitystatus/student-management-activitystatus-add/student-management-activitystatus-add.component';
import { EditAndDetailActivityStatusManagementComponent } from './student-management-activitystatus/student-management-activitystatus-edit-detail/student-management-activitystatus-edit-detail.component';
import { ListDisciplinaryStatusManagementComponent } from './student-management-disciplinarystatus/student-management-disciplinarystatus-list/student-management-disciplinarystatus-list.component';
import { AddDisciplinaryStatusManagementComponent } from './student-management-disciplinarystatus/student-management-disciplinarystatus-add/student-management-disciplinarystatus-add.component';
import { EditAndDetailDisciplinaryStatusManagementComponent } from './student-management-disciplinarystatus/student-management-disciplinarystatus-edit-detail/student-management-disciplinarystatus-edit.component';
import { ListLeaveTypeManagementComponent } from './student-management-leavetype/student-management-leavetype-list/student-management-leavetype-list.component';
import { AddLeaveTypeManagementComponent } from './student-management-leavetype/student-management-leavetype-add/student-management-leavetype-add.component';
import { EditAndDetailLeaveTypeManagementComponent } from './student-management-leavetype/student-management-leavetype-edit-detail/student-management-leavetype-edit-detail.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';
import { ListLanguageManagementComponent } from './student-management-language/student-management-language-list/student-management-language-list.component';
import { AddLanguageManagementComponent } from './student-management-language/student-management-language-add/student-management-language-add.component';
import { EditAndDetailLanguageManagementComponent } from './student-management-language/student-management-language-edit-detail/student-management-language-edit-detail.component';

const studentManagementLookUpRoutes: Routes = [
  {
    path: 'student/lookup', component: StudentManagementLookUpComponent,
    children: [
      {
        path: 'bloodgroup',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListBloodGroupManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
          },
          {
            path: 'add', component: AddBloodGroupManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailBloodGroupManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      },
      {
        path: 'caste',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListCasteManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
          },
          {
            path: 'add', component: AddCasteManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailCasteManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      },
      {
        path: 'gender',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListGenderManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
          },
          {
            path: 'add', component: AddGenderManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailGenderManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      },
      {
        path: 'level',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListLevelManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
          },
          {
            path: 'add', component: AddLevelManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailLevelManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      },
      {
        path: 'mothertongue',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListMotherTongueManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
          },
          {
            path: 'add', component: AddMotherTongueManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditDetailsMotherTongueManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      },
      {
        path: 'nationality',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListNationalityManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
          },
          {
            path: 'add', component: AddNationalityManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailNationalityManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      },
      {
        path: 'occupation',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListOccupationManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
          },
          {
            path: 'add', component: AddOccupationManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailOccupationManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      },
      {
        path: 'qualification',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListQualificationManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
          },
          {
            path: 'add', component: AddQualificationManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailQualificationManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      },
      {
        path: 'relationship',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListRelationshipManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
          },
          {
            path: 'add', component: AddRelationshipManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailRelationshipManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      },
      {
        path: 'religion',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListReligionManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
          },
          {
            path: 'add', component: AddReligionManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailReligionManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      },
      {
        path: 'religioncategory',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListReligionCategoryManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
          },
          {
            path: 'add', component: AddReligionCategoryManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailReligionCategoryManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      },
      {
        path: 'sportdetail',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListSportDetailManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
          },
          {
            path: 'add', component: AddSportDetailManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailSportDetailManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      },
      {
        path: 'maritalstatus',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListMaritalStatusManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
          },
          {
            path: 'add', component: AddMaritalStatusManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailMaritalStatusManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      },
      {
        path: 'section',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListSectionManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
          },
          {
            path: 'add', component: AddSectionManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailSectionManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      },
      {
        path: 'teachingstaff',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListTeachingStaffManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
          },
          {
            path: 'add', component: AddTeachingStaffManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailTeachingStaffManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      },
      {
        path: 'slab',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListSlabManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
          },
          {
            path: 'add', component: AddSlabManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailSlabManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      },
      {
        path: 'meetingagenda',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListMeetingAgendaManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
          },
          {
            path: 'add', component: AddMeetingAgendaManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailMeetingAgendaManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      },
      {
        path: 'activitystatus',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListActivityStatusManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
          },
          {
            path: 'add', component: AddActivityStatusManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailActivityStatusManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      },
      {
        path: 'disciplinarystatus',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListDisciplinaryStatusManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
          },
          {
            path: 'add', component: AddDisciplinaryStatusManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailDisciplinaryStatusManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      },
      {
        path: 'leavetype',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListLeaveTypeManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
          },
          {
            path: 'add', component: AddLeaveTypeManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailLeaveTypeManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      },
      {
        path: 'language',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListLanguageManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'View' }
          },
          {
            path: 'add', component: AddLanguageManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailLanguageManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      }
    ]
  },

];
export const StudentManagementLookUpRouting = RouterModule.forRoot(studentManagementLookUpRoutes);