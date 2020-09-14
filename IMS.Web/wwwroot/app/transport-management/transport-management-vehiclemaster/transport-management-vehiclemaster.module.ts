import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { TransportManagementVehicleMasterRouting } from './transport-management-vehiclemaster.routes';
import { TransportManagementVehicleMasterComponent } from './transport-management-vehiclemaster.component';
import { VehicleMasterService } from './transport-management-vehiclemaster.service';
import { ListTransportManagementVehicleMasterComponent } from './transport-management-vehiclemaster-list/transport-management-vehiclemaster-list.component';
import { EditAndDetailTransportManagementVehicleMasterComponent } from './transport-management-vehiclemaster-edit-detail/transport-management-vehiclemaster-edit-detail.component';
import { AddTransportManagementVehicleMasterComponent } from './transport-management-vehiclemaster-add/transport-management-vehiclemaster-add.component';


@NgModule({
  imports: [
    SharedModule,
    TransportManagementVehicleMasterRouting
  ],
  declarations: [
    TransportManagementVehicleMasterComponent,
    ListTransportManagementVehicleMasterComponent,
    EditAndDetailTransportManagementVehicleMasterComponent,
    AddTransportManagementVehicleMasterComponent
  ],
  providers: [
    VehicleMasterService
  ],
})
export class TransportManagementVehicleMasterModule { }
