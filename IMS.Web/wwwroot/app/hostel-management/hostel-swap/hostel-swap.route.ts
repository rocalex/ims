import { Routes, RouterModule } from '@angular/router';

import { HostelSwapComponent } from './hostel-swap.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const hostelSwapRoutes: Routes = [
  {
      path: 'hostel/vacantroom',
      children: [
          {
            path: '',
            component: HostelSwapComponent,
            canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
          }
      ]
  },

];
export const HostelSwapRouting = RouterModule.forRoot(hostelSwapRoutes);