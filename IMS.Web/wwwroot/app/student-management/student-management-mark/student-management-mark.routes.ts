import { Routes, RouterModule } from '@angular/router';
import { ListStudentManagementExamDefinitionComponent } from './student-management-examdefinition/student-management-examdefinition-list/student-management-examdefinition-list.component';
import { AddStudentManagementExamDefinitionComponent } from './student-management-examdefinition/student-management-examdefinition-add/student-management-examdefinition-add.component';
import { EditAndDetailStudentManagementExamDefinitionComponent } from './student-management-examdefinition/student-management-examdefinition-edit-detail/student-management-examdefinition-edit-detail.component';
import { StudentManagementMarkComponent } from './student-management-mark.component';
import { AddStudentManagementClassExamComponent } from './student-management-classexam/student-management-classexam-add/student-management-classexam-add.component';
import { EditAndDetailStudentManagementClassExamComponent } from './student-management-classexam/student-management-classexam-edit-detail/student-management-classexam-edit-detail.component';
import { ListStudentManagementClassExamComponent } from './student-management-classexam/student-management-classexam-list/student-management-classexam-list.component';
import { StudentManagementExamScoreEntryComponent } from './student-management-mark-examscoreentry/student-management-mark-examscoreentry.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const studentManagementMarkRoutes: Routes = [
  {
    path: 'student/mark', component: StudentManagementMarkComponent,
    children: [
      {
        path: 'examdefinition',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListStudentManagementExamDefinitionComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentMarkExamDefinition, type: 'View' }
          },
          {
            path: 'add', component: AddStudentManagementExamDefinitionComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentMarkExamDefinition, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailStudentManagementExamDefinitionComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentMarkExamDefinition, type: 'Edit' }
          }
        ]
      },
      {
        path: 'classexam',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListStudentManagementClassExamComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentMarkClassExam, type: 'View' }
          },
          {
            path: 'add', component: AddStudentManagementClassExamComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailStudentManagementClassExamComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentLookUp, type: 'Edit' }
          }
        ]
      },
      {
        path: 'examscoreentry',
        children: [
          {
            path: '', component: StudentManagementExamScoreEntryComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentMarkExamScoreEntry, type: 'View' }
          },
        ]
      }
    ]
  }
];
export const StudentManagementMarkRoutes = RouterModule.forRoot(studentManagementMarkRoutes);