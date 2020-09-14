import { Routes, RouterModule } from '@angular/router';

import { GenerateComponent } from './generate.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const routes: Routes = [
  {
      path: 'payroll/genpayroll',
      children: [
          {
            path: '',
            component: GenerateComponent,
            canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
          }
      ]
  },

];
export const GenerateRouting = RouterModule.forRoot(routes);