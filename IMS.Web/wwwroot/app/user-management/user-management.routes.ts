import { Routes, RouterModule } from '@angular/router';
import { UserManagementComponent } from './user-management.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditDetailsComponent } from './user/user-edit-details/user-edit-details.component';
import { ListUserGroupFeatureManagementComponent } from './user-group-feature-management/user-group-feature-management-list/user-group-feature-management-list.component';
import { EditAndDetailUserGroupFeatureManagementComponent } from './user-group-feature-management/user-group-feature-management-edit-detail/user-group-feature-management-edit-detail.component';
import { UserGroupManagementListComponent } from './user-group-management/user-group-management-list/user-group-management-list.component';
import { UserGroupManagementAddComponent } from './user-group-management/user-group-management-add/user-group-management-add.component';
import { UserGroupManagementEditDetailsComponent } from './user-group-management/user-group-management-edit-details/user-group-management-edit-details.component';
import { PermissionAuthGuard } from '../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../shared/sidenav/sidenav.model';

const userManagementRoutes: Routes = [
  {
    path: 'usermanagement', component: UserManagementComponent,
    children: [
      {
        path: 'user',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: UserListComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.UserManagementUsers, type: 'View' }
          },
          {
            path: 'add', component: UserAddComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.UserManagementUsers, type: 'Add' }
          },
          {
            path: ':id', component: UserEditDetailsComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.UserManagementUsers, type: 'Edit' }
          }
        ]
      },
      {
        path: 'permission',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListUserGroupFeatureManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.UserManagementPermission, type: 'View' }
          },
          {
            path: ':id', component: EditAndDetailUserGroupFeatureManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.UserManagementPermission, type: 'Edit' }
          }
        ]
      },
      {
        path: 'role',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: UserGroupManagementListComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.UserManagementRole, type: 'View' }
          },
          {
            path: 'add', component: UserGroupManagementAddComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.UserManagementRole, type: 'Add' }
          },
          {
            path: ':id', component: UserGroupManagementEditDetailsComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.UserManagementRole, type: 'Edit' }
          }
        ]
      }
    ]
  },

];
export const UserManagementRouting = RouterModule.forRoot(userManagementRoutes);