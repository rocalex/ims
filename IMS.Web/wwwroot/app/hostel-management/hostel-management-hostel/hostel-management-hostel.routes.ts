import { Routes, RouterModule } from '@angular/router';

import { HostelManagementHostelListComponent } from './hostel-management-hostel-list/hostel-management-hostel-list.component';
import { HostelManagementAddHostelComponent } from './hostel-management-hostel-add/hostel-management-hostel-add.component';
import { EditComponent } from './edit/edit.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const hostelManagementHostelRoutes: Routes = [
    {
        path: 'hostel/list',
        children: [
            {
              path: '',
              component: HostelManagementHostelListComponent,
              canActivate: [PermissionAuthGuard],
              data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            },
            {
                path: 'add',
                component: HostelManagementAddHostelComponent,
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
export const HostelManagementHostelRouting = RouterModule.forRoot(hostelManagementHostelRoutes);