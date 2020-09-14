import { Routes, RouterModule } from '@angular/router';
import { StaffAttendanceManagementComponent } from './staff-management-attendance.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const staffAttendanceManagementRoutes: Routes = [
  {
    path: 'staff/attendance',
    children: [
      {
        path: '', component: StaffAttendanceManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffAttendance, type: 'View' }
      }
    ]
  },

];
export const StaffAttendanceManagementRouting = RouterModule.forRoot(staffAttendanceManagementRoutes);