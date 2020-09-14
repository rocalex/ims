import { Routes, RouterModule } from '@angular/router';

import { ListStaffPlannerManagementComponent } from './staff-management-planner-list/staff-management-planner-list.component';
import { AddStaffPlannerManagementComponent } from './staff-management-planner-add/staff-management-planner-add.component';
import { EditDetailsStaffPlannerManagementComponent } from './staff-management-planner-edit-details/staff-management-planner-edit-details.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const staffPlannerManagementRoutes: Routes = [
  {
    path: 'staff/planner',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: ListStaffPlannerManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffPlanner, type: 'View' }
      },
      {
        path: 'add', component: AddStaffPlannerManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffPlanner, type: 'Add' }
      },
      {
        path: ':id', component: EditDetailsStaffPlannerManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffPlanner, type: 'Edit' }
      }
    ]
  },

];
export const StaffPlannerManagementRouting = RouterModule.forRoot(staffPlannerManagementRoutes);