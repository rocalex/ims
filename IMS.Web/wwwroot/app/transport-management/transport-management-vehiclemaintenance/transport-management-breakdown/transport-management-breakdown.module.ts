import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { TransportManagementBreakDownComponent } from './transport-management-breakdown.component';
import { TransportManagementBreakDownService } from './transport-management-breakdown.service';
import { ListTransportManagementBreakDownComponent } from './transport-management-breakdown-list/transport-management-breakdown-list.component';
import { AddTransportManagementBreakDownComponent } from './transport-management-breakdown-add/transport-management-breakdown-add.component';
import { EditAndDetailTransportManagementBreakDownComponent } from './transport-management-breakdown-edit-detail/transport-management-breakdown-edit.component';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    TransportManagementBreakDownComponent,
    AddTransportManagementBreakDownComponent,
    ListTransportManagementBreakDownComponent,
    EditAndDetailTransportManagementBreakDownComponent
  ],
  providers: [
    TransportManagementBreakDownService
  ],
})
export class TransportManagementBreakDownModule { }
