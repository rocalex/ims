import { Routes, RouterModule } from '@angular/router';
import { ListStudentInformationManagementComponent } from './student-management-information-list/student-management-information-list.component';
import { AddStudentInformationManagementComponent } from './student-management-information-add/student-management-information-add.component';
import { EditAndDetailStudentInformationManagementComponent } from './student-management-information-edit-detail/student-management-information-edit-detail.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';
import { ClassListComponent } from './student-class-list/classlist.component';

const studentInformationManagementRoutes: Routes = [
  {
    path: 'student/information',
    children: [
      { path: '', redirectTo: 'classlist', pathMatch: 'full' },
      { path: 'classlist', component: ClassListComponent, canActivate: [PermissionAuthGuard],
      data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentInfo, type: 'View' }  
      },
      {
        path: 'list',
        children: [
          { path: ':id',  component: ListStudentInformationManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentInfo, type: 'View' }
          }
        ]
      },
      {
        path: 'add', component: AddStudentInformationManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentInfo, type: 'Add' }
      },
      {
        path: ':id', component: EditAndDetailStudentInformationManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentInfo, type: 'Edit' }
      }
    ]
  },

];
export const StudentInformationManagementRouting = RouterModule.forRoot(studentInformationManagementRoutes);