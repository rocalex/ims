import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { TransportManagementDriverMasterRouting } from './transport-management-drivermaster.routes';
import { TransportManagementDriverMasterComponent } from './transport-management-drivermaster.component';
import { DriverMasterService } from './transport-management-drivermaster.service';
import { ListTransportManagementDriverMasterComponent } from './transport-management-drivermaster-list/transport-management-drivermaster-list.component';
import { EditAndDetailTransportManagementDriverMasterComponent } from './transport-management-drivermaster-edit-detail/transport-management-drivermaster-edit-detail.component';
import { AddTransportManagementDriverMasterComponent } from './transport-management-drivermaster-add/transport-management-drivermaster-add.component';


@NgModule({
  imports: [
    SharedModule,
    TransportManagementDriverMasterRouting
  ],
  declarations: [
    TransportManagementDriverMasterComponent,
    ListTransportManagementDriverMasterComponent,
    EditAndDetailTransportManagementDriverMasterComponent,
    AddTransportManagementDriverMasterComponent
  ],
  providers: [
    DriverMasterService
  ],
})
export class TransportManagementDriverMasterModule { }
