import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const routes: Routes = [
  {
      path: 'library/dashboard',
      children: [
          {
            path: '',
            component: DashboardComponent,
            canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
          }
      ]
  },

];
export const DashboardRouting = RouterModule.forRoot(routes);