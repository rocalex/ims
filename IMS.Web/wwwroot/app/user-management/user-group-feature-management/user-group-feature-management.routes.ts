import { Routes, RouterModule } from '@angular/router';
import { ListUserGroupFeatureManagementComponent } from './user-group-feature-management-list/user-group-feature-management-list.component';
import { EditAndDetailUserGroupFeatureManagementComponent } from './user-group-feature-management-edit-detail/user-group-feature-management-edit-detail.component';

const userGroupFeatureManagementRoutes: Routes = [
  {
        path: 'usermanagement/permission',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListUserGroupFeatureManagementComponent },
      { path: ':id', component: EditAndDetailUserGroupFeatureManagementComponent }
    ]
  },
];
export const UserGroupFeatureManagementRouting = RouterModule.forRoot(userGroupFeatureManagementRoutes);