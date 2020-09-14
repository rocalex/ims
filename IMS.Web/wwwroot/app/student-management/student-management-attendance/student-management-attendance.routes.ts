import { Routes, RouterModule } from '@angular/router';
import { StudentAttendanceManagementComponent } from './student-management-attendance.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const studentAttendanceManagementRoutes: Routes = [
  {
    path: 'student/attendance',
    children: [
      {
        path: '', component: StudentAttendanceManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentAttendance, type: 'View' }
      }
    ]
  },

];
export const StudentAttendanceManagementRouting = RouterModule.forRoot(studentAttendanceManagementRoutes);