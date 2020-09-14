import { Routes, RouterModule } from '@angular/router';

import { HostelAllocateComponent } from './hostel-allocate.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const hostelAllocateRoutes: Routes = [
  {
      path: 'hostel/allocateroom',
      children: [
          {
            path: '',
            component: HostelAllocateComponent,
            canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
          }
      ]
  },

];
export const HostelAllocateRouting = RouterModule.forRoot(hostelAllocateRoutes);