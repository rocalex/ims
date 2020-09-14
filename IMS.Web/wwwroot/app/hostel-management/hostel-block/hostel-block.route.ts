import { Routes, RouterModule } from '@angular/router';

import { HostelBlockAddComponent } from './hostel-block-add/hostel-block-add.component';
import { HostelBlockListComponent } from './hostel-block-list/hostel-block-list.component';
import { EditComponent } from './edit/edit.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const hostelBlockRoutes: Routes = [
  {
      path: 'hostel/blocks',
      children: [
          {
            path: '',
            component: HostelBlockListComponent,
            canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
          },
          {
              path: 'add',
              component: HostelBlockAddComponent,
              canActivate: [PermissionAuthGuard],
              data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
          },
          {
            path: ':id',
            component: EditComponent,
            canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
          }
      ]
  },

];
export const HostelBlockRouting = RouterModule.forRoot(hostelBlockRoutes);