import { Routes, RouterModule } from '@angular/router';
import { ListTransportManagementVehicleDriverMappingComponent } from './transport-management-vehicledrivermapping-list/transport-management-vehicledrivermapping-list.component';
import { EditAndDetailTransportManagementVehicleDriverMappingComponent } from './transport-management-vehicledrivermapping-edit-detail/transport-management-vehicledrivermapping-edit-detail.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const transportManagementVehicleDriverMappingRoutes: Routes = [
  {
    path: 'transportmanagement/vehicledrivermapping',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: ListTransportManagementVehicleDriverMappingComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportVehicleDriverMapping, type: 'View' }
      },
      {
        path: ':id', component: EditAndDetailTransportManagementVehicleDriverMappingComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportVehicleDriverMapping, type: 'Edit' }
      }
    ]
  },

];
export const TransportManagementVehicleDriverMappingRouting = RouterModule.forRoot(transportManagementVehicleDriverMappingRoutes);