import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { TransportManagementVehicleMaintenanceRouting } from './transport-management-vehiclemaintenance.routes';
import { TransportManagementVehicleMaintenanceComponent } from './transport-management-vehiclemaintenance.component';
import { TransportManagementMaintenanceModule } from './transport-management-maintenance/transport-management-maintenance.module';
import { TransportManagementRepairModule } from './transport-management-repair/transport-management-repair.module';
import { TransportManagementAccidentModule } from './transport-management-accident/transport-management-accident.module';
import { TransportManagementBreakDownModule } from './transport-management-breakdown/transport-management-breakdown.module';


@NgModule({
  imports: [
    SharedModule,
    TransportManagementVehicleMaintenanceRouting,
    TransportManagementMaintenanceModule,
    TransportManagementRepairModule,
    TransportManagementAccidentModule,
    TransportManagementBreakDownModule
  ],
  declarations: [
    TransportManagementVehicleMaintenanceComponent
  ],
  providers: [
  ],
})
export class TransportManagementVehicleMaintenanceModule { }
