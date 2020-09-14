import { Routes, RouterModule } from '@angular/router';
import { ListTransportManagementDriverMasterComponent } from './transport-management-drivermaster-list/transport-management-drivermaster-list.component';
import { EditAndDetailTransportManagementDriverMasterComponent } from './transport-management-drivermaster-edit-detail/transport-management-drivermaster-edit-detail.component';
import { AddTransportManagementDriverMasterComponent } from './transport-management-drivermaster-add/transport-management-drivermaster-add.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const transportManagementDriverMasterRoutes: Routes = [
  {
    path: 'transportmanagement/drivermaster',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: ListTransportManagementDriverMasterComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportDriver, type: 'View' }
      },
      {
        path: 'add', component: AddTransportManagementDriverMasterComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportDriver, type: 'Add' }
      },
      {
        path: ':id', component: EditAndDetailTransportManagementDriverMasterComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportDriver, type: 'Edit' }
      }
    ]
  },

];
export const TransportManagementDriverMasterRouting = RouterModule.forRoot(transportManagementDriverMasterRoutes);