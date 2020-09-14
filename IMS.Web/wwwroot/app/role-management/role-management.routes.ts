import { Routes, RouterModule } from '@angular/router';
import { RoleManagementListComponent } from './role-management-list/role-management-list.component';
import { RoleManagementAddComponent } from './role-management-add/role-management-add.component';

const roleManagementRoutes: Routes = [
  {
    path: 'role',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: RoleManagementListComponent },
      { path: 'add', component: RoleManagementAddComponent }
    ]
  },

];
export const RoleManagementRouting = RouterModule.forRoot(roleManagementRoutes);