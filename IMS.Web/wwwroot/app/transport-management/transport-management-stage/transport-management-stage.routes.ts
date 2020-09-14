import { Routes, RouterModule } from '@angular/router';
import { ListTransportManagementStageComponent } from './transport-management-stage-list/transport-management-stage-list.component';
import { EditAndDetailTransportManagementStageComponent } from './transport-management-stage-edit-detail/transport-management-stage-edit-detail.component';
import { AddTransportManagementStageComponent } from './transport-management-stage-add/transport-management-stage-add.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const transportManagementStageRoutes: Routes = [
  {
    path: 'transportmanagement/stage',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: ListTransportManagementStageComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportStage, type: 'View' }
      },
      {
        path: 'add', component: AddTransportManagementStageComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportStage, type: 'Add' }
      },
      {
        path: ':id', component: EditAndDetailTransportManagementStageComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Transportation, child: UserGroupFeatureChildEnum.TransportStage, type: 'Edit' }
      }
    ]
  },

];
export const TransportManagementStageRouting = RouterModule.forRoot(transportManagementStageRoutes);