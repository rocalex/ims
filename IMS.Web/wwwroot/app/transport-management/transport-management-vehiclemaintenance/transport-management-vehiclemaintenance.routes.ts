import { Routes, RouterModule } from '@angular/router';
import { TransportManagementVehicleMaintenanceComponent } from './transport-management-vehiclemaintenance.component';
import { ListTransportManagementMaintenanceComponent } from './transport-management-maintenance/transport-management-maintenance-list/transport-management-maintenance-list.component';
import { AddTransportManagementMaintenanceComponent } from './transport-management-maintenance/transport-management-maintenance-add/transport-management-maintenance-add.component';
import { EditAndDetailTransportManagementMaintenanceComponent } from './transport-management-maintenance/transport-management-maintenance-edit-detail/transport-management-maintenance-edit.component';
import { ListTransportManagementRepairComponent } from './transport-management-repair/transport-management-repair-list/transport-management-repair-list.component';
import { AddTransportManagementRepairComponent } from './transport-management-repair/transport-management-repair-add/transport-management-repair-add.component';
import { EditAndDetailTransportManagementRepairComponent } from './transport-management-repair/transport-management-repair-edit-detail/transport-management-repair-edit.component';
import { ListTransportManagementAccidentComponent } from './transport-management-accident/transport-management-accident-list/transport-management-accident-list.component';
import { AddTransportManagementAccidentComponent } from './transport-management-accident/transport-management-accident-add/transport-management-accident-add.component';
import { EditAndDetailTransportManagementAccidentComponent } from './transport-management-accident/transport-management-accident-edit-detail/transport-management-accident-edit.component';
import { ListTransportManagementBreakDownComponent } from './transport-management-breakdown/transport-management-breakdown-list/transport-management-breakdown-list.component';
import { AddTransportManagementBreakDownComponent } from './transport-management-breakdown/transport-management-breakdown-add/transport-management-breakdown-add.component';
import { EditAndDetailTransportManagementBreakDownComponent } from './transport-management-breakdown/transport-management-breakdown-edit-detail/transport-management-breakdown-edit.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const transportManagementVehicleMaintenanceRoutes: Routes = [
  {
    path: 'transportmanagement/vehiclemaintenance', component: TransportManagementVehicleMaintenanceComponent,
    children: [
      {
        path: 'maintenance',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListTransportManagementMaintenanceComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportVehicleMaintanence, type: 'View' }
          },
          {
            path: 'add', component: AddTransportManagementMaintenanceComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportVehicleMaintanence, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailTransportManagementMaintenanceComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportVehicleMaintanence, type: 'Edit' }
          }
        ]
      },
      {
        path: 'repair',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListTransportManagementRepairComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportVehicleRepair, type: 'View' }
          },
          {
            path: 'add', component: AddTransportManagementRepairComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportVehicleRepair, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailTransportManagementRepairComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportVehicleRepair, type: 'Edit' }
          }
        ]
      },
      {
        path: 'accident',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListTransportManagementAccidentComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportVehicleAccident, type: 'View' }
          },
          {
            path: 'add', component: AddTransportManagementAccidentComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportVehicleAccident, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailTransportManagementAccidentComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportVehicleAccident, type: 'Edit' }
          }
        ]
      },
      {
        path: 'breakdown',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListTransportManagementBreakDownComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportVehicleBreakDown, type: 'View' }
          },
          {
            path: 'add', component: AddTransportManagementBreakDownComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportVehicleBreakDown, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailTransportManagementBreakDownComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportVehicleBreakDown, type: 'Edit' }
          }
        ]
      }
    ]
  },

];
export const TransportManagementVehicleMaintenanceRouting = RouterModule.forRoot(transportManagementVehicleMaintenanceRoutes);