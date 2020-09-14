import { Routes, RouterModule } from '@angular/router';

import { ListDepartmentManagementComponent } from './staff-management-department-list/staff-management-department-list.component';
import { AddDepartmentManagementComponent } from './staff-management-department-add/staff-management-department-add.component';
import { EditDetailsDepartmentManagementComponent } from './staff-management-department-edit-details/staff-management-department-edit-details.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const staffDepartmentManagementRoutes: Routes = [
  {
    path: 'staff/department',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: ListDepartmentManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffDepartment, type: 'View' }
      },
      {
        path: 'add', component: AddDepartmentManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffDepartment, type: 'Add' } },
      {
        path: ':id', component: EditDetailsDepartmentManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffDepartment, type: 'Edit' } }
    ]
  },

];
export const StaffDepartmentManagementRouting = RouterModule.forRoot(staffDepartmentManagementRoutes);