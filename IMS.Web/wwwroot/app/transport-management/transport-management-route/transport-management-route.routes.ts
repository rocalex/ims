import { Routes, RouterModule } from '@angular/router';
import { ListTransportManagementRouteComponent } from './transport-management-route-list/transport-management-route-list.component';
import { EditAndDetailTransportManagementRouteComponent } from './transport-management-route-edit-detail/transport-management-route-edit-detail.component';
import { AddTransportManagementRouteComponent } from './transport-management-route-add/transport-management-route-add.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const transportManagementRouteRoutes: Routes = [
  {
    path: 'transportmanagement/route',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: ListTransportManagementRouteComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportRoute, type: 'View' }
      },
      {
        path: 'add', component: AddTransportManagementRouteComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportRoute, type: 'Add' }
      },
      {
        path: ':id', component: EditAndDetailTransportManagementRouteComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportRoute, type: 'Edit' }
      }
    ]
  },

];
export const TransportManagementRouteRouting = RouterModule.forRoot(transportManagementRouteRoutes);