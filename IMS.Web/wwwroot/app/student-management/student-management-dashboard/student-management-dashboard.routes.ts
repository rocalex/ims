import { Routes, RouterModule } from '@angular/router';
import { StudentManagementDashboardComponent } from './student-management-dashboard.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const studentManagementDashboardRoutes: Routes = [
    {
        path: 'student/dashboard',
        children: [
          {
            path: '', component: StudentManagementDashboardComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
          }
        ]
    },

];
export const StudentManagementDashboardRouting = RouterModule.forRoot(studentManagementDashboardRoutes);