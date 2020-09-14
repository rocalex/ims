import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { PermissionAuthGuard } from '../../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { TaxTypeComponent } from './taxtype.component';

const routes: Routes = [
  {
      path: 'inventory/lookup/taxtype', component: TaxTypeComponent,
      children: [
          {
            path: '',
            component: ListComponent,
            canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
          },
          {
            path: 'add',
            component: AddComponent,
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
export const TaxTypeRouting = RouterModule.forRoot(routes);