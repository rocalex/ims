import { Routes, RouterModule } from '@angular/router';
import { ListTransportManagementVehicleMasterComponent } from './transport-management-vehiclemaster-list/transport-management-vehiclemaster-list.component';
import { EditAndDetailTransportManagementVehicleMasterComponent } from './transport-management-vehiclemaster-edit-detail/transport-management-vehiclemaster-edit-detail.component';
import { AddTransportManagementVehicleMasterComponent } from './transport-management-vehiclemaster-add/transport-management-vehiclemaster-add.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const transportManagementVehicleMasterRoutes: Routes = [
  {
    path: 'transportmanagement/vehiclemaster',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: ListTransportManagementVehicleMasterComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportVehicle, type: 'View' }
      },
      {
        path: 'add', component: AddTransportManagementVehicleMasterComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportVehicle, type: 'Add' }
      },
      {
        path: ':id', component: EditAndDetailTransportManagementVehicleMasterComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportVehicle, type: 'Edit' }
      }
    ]
  },

];
export const TransportManagementVehicleMasterRouting = RouterModule.forRoot(transportManagementVehicleMasterRoutes);