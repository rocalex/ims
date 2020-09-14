import { Routes, RouterModule } from '@angular/router';
import { InstituteManagementComponent } from './institute-management.component';
import { ListAcademicYearManagementComponent } from './institute-management-academic-year/institute-management-academic-year-list/institute-management-academic-year-list.component';
import { AddAcademicYearManagementComponent } from './institute-management-academic-year/institute-management-academic-year-add/institute-management-academic-year-add.component';
import { EditDetailsAcademicYearManagementComponent } from './institute-management-academic-year/institute-management-academic-year-edit-details/institute-management-academic-year-edit-details';
import { ListClassManagementComponent } from './institute-management-class/institute-management-class-list/institute-management-class-list.component';
import { AddClassManagementComponent } from './institute-management-class/institute-management-class-add/institute-management-class-add.component';
import { EditDetailsClassManagementComponent } from './institute-management-class/institute-management-class-edit-details/institute-management-class-edit-details';
import { ListClassSubjectMappingManagementComponent } from './institute-management-class-subject-mapping/institute-management-class-subject-mapping-list/institute-management-class-subject-mapping-list.component';
import { ListHolidayOffManagementComponent } from './institute-management-holiday-off/institute-management-holiday-off-list/institute-management-holiday-off-list.component';
import { AddHolidayOffManagementComponent } from './institute-management-holiday-off/institute-management-holiday-off-add/institute-management-holiday-off-add.component';
import { EditDetailsHolidayOffManagementComponent } from './institute-management-holiday-off/institute-management-holiday-off-edit-details/institute-management-holiday-off-edit-details.component';
import { ListSubjectManagementComponent } from './institute-management-subject/institute-management-subject-list/institute-management-subject-list.component';
import { AddSubjectManagementComponent } from './institute-management-subject/institute-management-subject-add/institute-management-subject-add.component';
import { EditDetailsSubjectManagementComponent } from './institute-management-subject/institute-management-subject-edit-details/institute-management-subject-edit-details';
import { TimeTableManagementComponent } from './institute-management-time-table/institute-management-time-table.component';
import { GenerateTimeTableManagementComponent } from './institute-management-time-table/institute-management-time-table-generate/institute-management-time-table-generate.component';
import { ListEditWeekOffManagementComponent } from './institute-management-week-off/institute-management-week-off-list-edit/institute-management-week-off-list-edit.component';
import { PermissionAuthGuard } from '../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../shared/sidenav/sidenav.model';

const instituteManagementRoutes: Routes = [
  {
    path: 'institute', component: InstituteManagementComponent,
    children: [
      {
        path: 'academicyear',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListAcademicYearManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.InstituteAcademicYear, type: 'View' }
          },
          {
            path: 'add', component: AddAcademicYearManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.InstituteAcademicYear, type: 'Add' }
          },
          {
            path: ':id', component: EditDetailsAcademicYearManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.InstituteAcademicYear, type: 'Edit' }
          }
        ]
      },
      {
        path: 'class',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListClassManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.InstituteClass, type: 'View' }
          },
          {
            path: 'add', component: AddClassManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.InstituteClass, type: 'Add' }
          },
          {
            path: ':id', component: EditDetailsClassManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.InstituteClass, type: 'Edit' }
          }
        ]
      },
      {
        path: 'classsubject',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListClassSubjectMappingManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.InstituteClassSubjectMapping, type: 'View' }
          }
        ]
      },
      {
        path: 'holiday',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListHolidayOffManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.InstituteHolidayOff, type: 'View' }
          },
          {
            path: 'list/:academicyearid', component: ListHolidayOffManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.InstituteHolidayOff, type: 'View' }
          },
          {
            path: 'add/:academicyearid', component: AddHolidayOffManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.InstituteHolidayOff, type: 'Add' }
          },
          {
            path: ':id', component: EditDetailsHolidayOffManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.InstituteHolidayOff, type: 'Edit' }
          }
        ]
      },
      {
        path: 'subject',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListSubjectManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.InstituteSubject, type: 'View' }
          },
          {
            path: 'add', component: AddSubjectManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.InstituteSubject, type: 'Add' }
          },
          {
            path: ':id', component: EditDetailsSubjectManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.InstituteSubject, type: 'Edit' }
          }
        ]
      },
      {
        path: 'timetable',
        children: [
          { path: '', component: TimeTableManagementComponent },
          {
            path: 'generate/:classId/:sectionId', component: GenerateTimeTableManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.InstituteTimeTable, type: 'View' }
          }
        ]
      },
      {
        path: 'weekoff',
        children: [
          {
            path: '', component: ListEditWeekOffManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.InstituteWeekOff, type: 'View' }
          }
        ]
      }
    ]
  },

];
export const InstituteManagementRouting = RouterModule.forRoot(instituteManagementRoutes);