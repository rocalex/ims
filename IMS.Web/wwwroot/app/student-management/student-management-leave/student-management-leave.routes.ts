import { Routes, RouterModule } from '@angular/router';
import { ListStudentLeaveManagementComponent } from './student-management-leave-list/student-management-leave-list.component';
import { AddStudentLeaveManagementComponent } from './student-management-leave-add/student-management-leave-add.component';
import { EditAndDetailStudentLeaveManagementComponent } from './student-management-leave-edit-detail/student-management-leave-edit-detail.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const studentLeaveManagementRoutes: Routes = [
  {
    path: 'student/leavemanagement',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: ListStudentLeaveManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLeaveManagement, type: 'View' }
      },
      {
        path: 'add', component: AddStudentLeaveManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLeaveManagement, type: 'Add' }
      },
      {
        path: ':id', component: EditAndDetailStudentLeaveManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLeaveManagement, type: 'Edit' }
      }
    ]
  },

];
export const StudentLeaveManagementRouting = RouterModule.forRoot(studentLeaveManagementRoutes);