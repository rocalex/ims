import { Routes, RouterModule } from '@angular/router';
import { ListStudentRelievingManagementComponent } from './student-management-relieving-list/student-management-relieving-list.component';
import { AddStudentRelievingManagementComponent } from './student-management-relieving-add/student-management-relieving-add.component';
import { EditAndDetailStudentRelievingManagementComponent } from './student-management-relieving-edit-detail/student-management-relieving-edit-detail.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const studentRelievingManagementRoutes: Routes = [
  {
    path: 'student/relieving',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: ListStudentRelievingManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentRelieving, type: 'View' }
      },
      {
        path: 'add', component: AddStudentRelievingManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentRelieving, type: 'Add' }
      },
      {
        path: ':id', component: EditAndDetailStudentRelievingManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentRelieving, type: 'Edit' }
      }
    ]
  },

];
export const StudentRelievingManagementRouting = RouterModule.forRoot(studentRelievingManagementRoutes);