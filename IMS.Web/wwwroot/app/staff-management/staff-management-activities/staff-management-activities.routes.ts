import { Routes, RouterModule } from '@angular/router';
import { StaffManagementActivitiesComponent } from './staff-management-activities.component';
import { ListStaffActivityManagementComponent } from './staff-management-activity/staff-management-activity-list/staff-management-activity-list.component';
import { AddStaffActivityManagementComponent } from './staff-management-activity/staff-management-activity-add/staff-management-activity-add.component';
import { EditDetailsStaffActivityManagementComponent } from './staff-management-activity/staff-management-activity-edit-details/staff-management-activity-edit-details.component';
import { StaffManagementHomeworkComponent } from './staff-management-homework/staff-management-homework.component';
import { ListStaffDisciplinaryManagementComponent } from './staff-management-disciplinary/staff-management-disciplinary-list/staff-management-disciplinary-list.component';
import { AddStaffDisciplinaryManagementComponent } from './staff-management-disciplinary/staff-management-disciplinary-add/staff-management-disciplinary-add.component';
import { EditAndDetailStaffDisciplinaryManagementComponent } from './staff-management-disciplinary/staff-management-disciplinary-edit-detail/staff-management-disciplinary-edit.component';
import { ListNoticeManagementComponent } from './staff-management-notice/staff-management-notice-list/staff-management-notice-list.component';
import { AddNoticeManagementComponent } from './staff-management-notice/staff-management-notice-add/staff-management-notice-add.component';
import { EditDetailsNoticeManagementComponent } from './staff-management-notice/staff-management-notice-edit-details/staff-management-notice-edit-details.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const staffManagementActivitiesRoutes: Routes = [
  {
    path: 'staff/activities', component: StaffManagementActivitiesComponent,
    children: [
      {
        path: 'activity',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListStaffActivityManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffActivity, type: 'View' }
          },
          {
            path: 'add', component: AddStaffActivityManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffActivity, type: 'Add' }
          },
          {
            path: ':id', component: EditDetailsStaffActivityManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffActivity, type: 'Edit' }
          }
        ]
      },
      {
        path: 'homework', component: StaffManagementHomeworkComponent
      },
      {
        path: 'disciplinary',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListStaffDisciplinaryManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.Disciplinary, type: 'View' }
          },
          {
            path: 'add', component: AddStaffDisciplinaryManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.Disciplinary, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailStaffDisciplinaryManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.Disciplinary, type: 'Edit' }
          }
        ]
      },
      {
        path: 'notice',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListNoticeManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.CircularNotice, type: 'View' }
          },
          {
            path: 'add', component: AddNoticeManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.CircularNotice, type: 'Add' }
          },
          {
            path: ':id', component: EditDetailsNoticeManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.CircularNotice, type: 'Edit' }
          }
        ]
      }
    ]
  },

];
export const StaffManagementActivitiesRouting = RouterModule.forRoot(staffManagementActivitiesRoutes);