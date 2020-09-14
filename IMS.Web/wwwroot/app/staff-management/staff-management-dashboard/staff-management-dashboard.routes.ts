import { Routes, RouterModule } from '@angular/router';
import { StaffManagementDashboardComponent } from './staff-management-dashboard.component';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';

const staffManagementDashboardRoutes: Routes = [
  {
    path: 'staff/dashboard',
    children: [
      {
        path: '', component: StaffManagementDashboardComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffDashboard, type: 'View' }
      }
    ]
  },

];
export const StaffManagementDashboardRouting = RouterModule.forRoot(staffManagementDashboardRoutes);