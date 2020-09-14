import { Routes, RouterModule } from '@angular/router';
import { ListStaffManagementInformationComponent } from './staff-management-information-list/staff-management-information-list.component';
import { AddStaffManagementInformationComponent } from './staff-management-information-add/staff-management-information-add.component';
import { EditAndDetailStaffManagementInformationComponent } from './staff-management-information-edit-detail/staff-management-information-edit-detail.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const staffManagementRoutes: Routes = [
  {
    path: 'staff/master',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: ListStaffManagementInformationComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffInfo, type: 'View' }
      },
      {
        path: 'add', component: AddStaffManagementInformationComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffInfo, type: 'Add' }
      },
      {
        path: ':id', component: EditAndDetailStaffManagementInformationComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffInfo, type: 'Edit' }
      }
    ]
  },

];
export const StaffManagementInformationRouting = RouterModule.forRoot(staffManagementRoutes);