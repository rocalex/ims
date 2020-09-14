import { Routes, RouterModule } from '@angular/router';
import { StaffManagementReportViewComponent } from './staff-management-report-view/staff-management-report-view.component';
import { StaffManagementReportListComponent } from './staff-management-report-list/staff-management-report-list.component';
import { StaffManagementReportChartComponent } from './staff-management-report-chart/staff-management-report-chart.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const staffManagementReportRoutes: Routes = [
  {
    path: 'staff/report',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: StaffManagementReportListComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffReport, type: 'View' }
      },
      {
        path: ':id', component: StaffManagementReportViewComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffReport, type: 'View' }
      },
      {
        path: 'chart/:id', component: StaffManagementReportChartComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Staff, child: UserGroupFeatureChildEnum.StaffReport, type: 'View' }
      }
    ]
  },

];
export const StaffManagementReportRouting = RouterModule.forRoot(staffManagementReportRoutes);