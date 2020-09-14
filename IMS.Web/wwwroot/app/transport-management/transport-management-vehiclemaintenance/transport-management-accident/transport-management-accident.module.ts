import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { TransportManagementAccidentComponent } from './transport-management-accident.component';
import { TransportManagementAccidentService } from './transport-management-accident.service';
import { ListTransportManagementAccidentComponent } from './transport-management-accident-list/transport-management-accident-list.component';
import { AddTransportManagementAccidentComponent } from './transport-management-accident-add/transport-management-accident-add.component';
import { EditAndDetailTransportManagementAccidentComponent } from './transport-management-accident-edit-detail/transport-management-accident-edit.component';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    TransportManagementAccidentComponent,
    AddTransportManagementAccidentComponent,
    ListTransportManagementAccidentComponent,
    EditAndDetailTransportManagementAccidentComponent
  ],
  providers: [
    TransportManagementAccidentService
  ],
})
export class TransportManagementAccidentModule { }
