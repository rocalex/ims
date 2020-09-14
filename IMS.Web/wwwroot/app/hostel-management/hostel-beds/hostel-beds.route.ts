import { Routes, RouterModule } from '@angular/router';

import { HostelBedsComponent } from './hostel-beds.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const hostelBedsRoutes: Routes = [
  {
      path: 'hostel/bedinfo',
      children: [
          {
            path: '',
            component: HostelBedsComponent,
            canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
          }
      ]
  },

];
export const HostelBedsRouting = RouterModule.forRoot(hostelBedsRoutes);