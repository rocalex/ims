import { Routes, RouterModule } from '@angular/router';

import { ListDesignationManagementComponent } from './staff-management-designation-list/staff-management-designation-list.component';
import { AddDesignationManagementComponent } from './staff-management-designation-add/staff-management-designation-add.component';
import { EditDetailsDesignationManagementComponent } from './staff-management-designation-edit-details/staff-management-designation-edit-details.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const staffDesignationManagementRoutes: Routes = [
  {
    path: 'staff/designation',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: ListDesignationManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffDesignation, type: 'View' }
      },
      {
        path: 'add', component: AddDesignationManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffDesignation, type: 'Add' } },
      {
        path: ':id', component: EditDetailsDesignationManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffDesignation, type: 'Edit' } }
    ]
  },

];
export const StaffDesignationManagementRouting = RouterModule.forRoot(staffDesignationManagementRoutes);