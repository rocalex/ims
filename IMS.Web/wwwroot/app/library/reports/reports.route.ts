import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent } from './reports.component';
import { BookWiseComponent } from './bookwise/bookwise.component';
import { UserWiseComponent } from './userwise/userwise.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const routes: Routes = [
  {
      path: 'library/reports',
      children: [
          {
            path: '',
            component: ReportsComponent,
            canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
          },
          {
            path: 'bookwise',
            component: BookWiseComponent,
            canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
          },
          {
            path: 'userwise',
            component: UserWiseComponent,
            canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
          },
      ]
  },
];
export const ReportRouting = RouterModule.forRoot(routes);