import { Routes, RouterModule } from '@angular/router';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';
import { HostelManagementDashboardComponent } from './hostel-management-dashboard.component';

const hostelManagementDashboardRoutes: Routes = [
    {
        path: 'hostel/dashboard',
        children: [
          {
            path: '',
            component: HostelManagementDashboardComponent,
            canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
          }
        ]
    },

];
export const HostelManagementDashboardRouting = RouterModule.forRoot(hostelManagementDashboardRoutes);