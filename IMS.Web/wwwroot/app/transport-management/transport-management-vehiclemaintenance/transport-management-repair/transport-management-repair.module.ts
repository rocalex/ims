import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { TransportManagementRepairComponent } from './transport-management-repair.component';
import { TransportManagementRepairService } from './transport-management-repair.service';
import { ListTransportManagementRepairComponent } from './transport-management-repair-list/transport-management-repair-list.component';
import { AddTransportManagementRepairComponent } from './transport-management-repair-add/transport-management-repair-add.component';
import { EditAndDetailTransportManagementRepairComponent } from './transport-management-repair-edit-detail/transport-management-repair-edit.component';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    TransportManagementRepairComponent,
    AddTransportManagementRepairComponent,
    ListTransportManagementRepairComponent,
    EditAndDetailTransportManagementRepairComponent
  ],
  providers: [
    TransportManagementRepairService
  ],
})
export class TransportManagementRepairModule { }
