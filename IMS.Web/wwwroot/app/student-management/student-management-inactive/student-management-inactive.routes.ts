import { Routes, RouterModule } from '@angular/router';
import { StudentManagementInActiveComponent } from './student-management-inactive.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const studentManagementInActiveRoutes: Routes = [
  {
    path: 'student/inactive',
    children: [
      {
        path: '', component: StudentManagementInActiveComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentInActive, type: 'View' }
      }
    ]
  },

];
export const StudentManagementInActiveRouting = RouterModule.forRoot(studentManagementInActiveRoutes);