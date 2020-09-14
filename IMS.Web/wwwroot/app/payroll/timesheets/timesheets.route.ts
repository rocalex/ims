import { Routes, RouterModule } from '@angular/router';

import { TimesheetsComponent } from './timesheets.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const routes: Routes = [
  {
      path: 'payroll/timesheets',
      children: [
          {
            path: '',
            component: TimesheetsComponent,
            canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
          }
      ]
  },

];
export const TimesheetsRouting = RouterModule.forRoot(routes);