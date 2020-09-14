import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { TransportManagementRouteRouting } from './transport-management-route.routes';
import { TransportManagementRouteComponent } from './transport-management-route.component';
import { RouteService } from './transport-management-route.service';
import { ListTransportManagementRouteComponent } from './transport-management-route-list/transport-management-route-list.component';
import { EditAndDetailTransportManagementRouteComponent } from './transport-management-route-edit-detail/transport-management-route-edit-detail.component';
import { AddTransportManagementRouteComponent } from './transport-management-route-add/transport-management-route-add.component';


@NgModule({
  imports: [
    SharedModule,
    TransportManagementRouteRouting
  ],
  declarations: [
    TransportManagementRouteComponent,
    ListTransportManagementRouteComponent,
    EditAndDetailTransportManagementRouteComponent,
    AddTransportManagementRouteComponent
  ],
  providers: [
    RouteService
  ],
})
export class TransportManagementRouteModule { }
