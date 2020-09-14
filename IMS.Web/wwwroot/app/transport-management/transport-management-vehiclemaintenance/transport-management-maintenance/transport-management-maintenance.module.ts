import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { TransportManagementMaintenanceComponent } from './transport-management-maintenance.component';
import { TransportManagementMaintenanceService } from './transport-management-maintenance.service';
import { ListTransportManagementMaintenanceComponent } from './transport-management-maintenance-list/transport-management-maintenance-list.component';
import { AddTransportManagementMaintenanceComponent } from './transport-management-maintenance-add/transport-management-maintenance-add.component';
import { EditAndDetailTransportManagementMaintenanceComponent } from './transport-management-maintenance-edit-detail/transport-management-maintenance-edit.component';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    TransportManagementMaintenanceComponent,
    AddTransportManagementMaintenanceComponent,
    ListTransportManagementMaintenanceComponent,
    EditAndDetailTransportManagementMaintenanceComponent
  ],
  providers: [
    TransportManagementMaintenanceService
  ],
})
export class TransportManagementMaintenanceModule { }
