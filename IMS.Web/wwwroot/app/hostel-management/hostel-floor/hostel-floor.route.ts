import { Routes, RouterModule } from '@angular/router';

import { HostelFloorComponent } from './hostel-floor.component';
import { DetailComponent } from './detail/detail.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const hostelFloorRoutes: Routes = [
  {
      path: 'hostel/floors',
      children: [
          {
            path: '',
            component: HostelFloorComponent,
            canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
          },
          {
            path: ':id',
            children: [
              {
                path: ':floor',
                component: DetailComponent
              }
            ]
          }
      ]
  },

];
export const HostelFloorRouting = RouterModule.forRoot(hostelFloorRoutes);