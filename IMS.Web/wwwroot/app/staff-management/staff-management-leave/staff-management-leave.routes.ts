import { Routes, RouterModule } from '@angular/router';
import { ListStaffLeaveManagementComponent } from './staff-management-leave-list/staff-management-leave-list.component';
import { AddStaffLeaveManagementComponent } from './staff-management-leave-add/staff-management-leave-add.component';
import { EditAndDetailStaffLeaveManagementComponent } from './staff-management-leave-edit-detail/staff-management-leave-edit-detail.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const staffLeaveManagementRoutes: Routes = [
  {
    path: 'staff/leavemanagement',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: ListStaffLeaveManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffLeaveManagement, type: 'View' }
      },
      {
        path: 'add', component: AddStaffLeaveManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffLeaveManagement, type: 'Add' }
      },
      {
        path: ':id', component: EditAndDetailStaffLeaveManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffLeaveManagement, type: 'Edit' }
      }
    ]
  },

];
export const StaffLeaveManagementRouting = RouterModule.forRoot(staffLeaveManagementRoutes);