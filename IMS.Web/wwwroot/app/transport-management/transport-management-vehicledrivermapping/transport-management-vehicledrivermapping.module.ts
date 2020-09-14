import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { TransportManagementVehicleDriverMappingRouting } from './transport-management-vehicledrivermapping.routes';
import { TransportManagementVehicleDriverMappingComponent } from './transport-management-vehicledrivermapping.component';
import { VehicleDriverMappingService } from './transport-management-vehicledrivermapping.service';
import { ListTransportManagementVehicleDriverMappingComponent } from './transport-management-vehicledrivermapping-list/transport-management-vehicledrivermapping-list.component';
import { EditAndDetailTransportManagementVehicleDriverMappingComponent } from './transport-management-vehicledrivermapping-edit-detail/transport-management-vehicledrivermapping-edit-detail.component';


@NgModule({
  imports: [
    SharedModule,
    TransportManagementVehicleDriverMappingRouting
  ],
  declarations: [
    TransportManagementVehicleDriverMappingComponent,
    ListTransportManagementVehicleDriverMappingComponent,
    EditAndDetailTransportManagementVehicleDriverMappingComponent
  ],
  providers: [
    VehicleDriverMappingService
  ],
})
export class TransportManagementVehicleDriverMappingModule { }
