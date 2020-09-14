import { Routes, RouterModule } from '@angular/router';

import { PayslipComponent } from './payslip.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const routes: Routes = [
  {
      path: 'payroll/downloadpayslips',
      children: [
          {
            path: '',
            component: PayslipComponent,
            canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
          }
      ]
  },

];
export const PayslipRouting = RouterModule.forRoot(routes);