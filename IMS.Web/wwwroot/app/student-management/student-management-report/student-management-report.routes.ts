import { Routes, RouterModule } from '@angular/router';
import { StudentManagementReportViewComponent } from './student-management-report-view/student-management-report-view.component';
import { StudentManagementReportListComponent } from './student-management-report-list/student-management-report-list.component';
import { StudentManagementReportChartComponent } from './student-management-report-chart/student-management-report-chart.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const StudentManagementReportRoutes: Routes = [
  {
    path: 'student/report',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: StudentManagementReportListComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentReport, type: 'View' }
      },
      {
        path: ':id', component: StudentManagementReportViewComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentReport, type: 'View' }
      },
      {
        path: 'chart/:id', component: StudentManagementReportChartComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentReport, type: 'View' }
      }
    ]
  },

];
export const StudentManagementReportRouting = RouterModule.forRoot(StudentManagementReportRoutes);