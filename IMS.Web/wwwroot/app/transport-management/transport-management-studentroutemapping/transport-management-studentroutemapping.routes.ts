import { Routes, RouterModule } from '@angular/router';
import { ListTransportManagementStudentRouteMappingComponent } from './transport-management-studentroutemapping-list/transport-management-studentroutemapping-list.component';
import { EditAndDetailTransportManagementStudentRouteMappingComponent } from './transport-management-studentroutemapping-edit-detail/transport-management-studentroutemapping-edit-detail.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const transportManagementStudentRouteMappingRoutes: Routes = [
  {
    path: 'transportmanagement/studentroutemapping',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: ListTransportManagementStudentRouteMappingComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportStudentRouteMapping, type: 'View' }
      },
      {
        path: ':id', component: EditAndDetailTransportManagementStudentRouteMappingComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportStudentRouteMapping, type: 'Edit' }
      }
    ]
  },

];
export const TransportManagementStudentRouteMappingRouting = RouterModule.forRoot(transportManagementStudentRouteMappingRoutes);