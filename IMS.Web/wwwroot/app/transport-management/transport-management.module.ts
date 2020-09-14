import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TransportManagementComponent } from './transport-management.component';
import { TransportManagementRouting } from './transport-management.routes';
import { TransportManagementVehicleMasterModule } from './transport-management-vehiclemaster/transport-management-vehiclemaster.module';
import { TransportManagementDriverMasterModule } from './transport-management-drivermaster/transport-management-drivermaster.module';
import { TransportManagementStageModule } from './transport-management-stage/transport-management-stage.module';
import { TransportManagementRouteModule } from './transport-management-route/transport-management-route.module';
import { TransportManagementStudentRouteMappingModule } from './transport-management-studentroutemapping/transport-management-studentroutemapping.module';
import { TransportManagementVehicleMaintenanceModule } from './transport-management-vehiclemaintenance/transport-management-vehiclemaintenance.module';
import { TransportManagementVehicleDriverMappingModule } from './transport-management-vehicledrivermapping/transport-management-vehicledrivermapping.module';


@NgModule({
  imports: [
    SharedModule,
    TransportManagementRouting,
    TransportManagementVehicleMasterModule,
    TransportManagementDriverMasterModule,
    TransportManagementStageModule,
    TransportManagementRouteModule,
    TransportManagementStudentRouteMappingModule,
    TransportManagementVehicleMaintenanceModule,
    TransportManagementVehicleDriverMappingModule
  ],
  declarations: [
    TransportManagementComponent
  ],
  providers: [
  ],
})
export class TransportManagementModule { }
