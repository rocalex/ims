import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { TransportManagementStageRouting } from './transport-management-stage.routes';
import { TransportManagementStageComponent } from './transport-management-stage.component';
import { StageService } from './transport-management-stage.service';
import { ListTransportManagementStageComponent } from './transport-management-stage-list/transport-management-stage-list.component';
import { EditAndDetailTransportManagementStageComponent } from './transport-management-stage-edit-detail/transport-management-stage-edit-detail.component';
import { AddTransportManagementStageComponent } from './transport-management-stage-add/transport-management-stage-add.component';


@NgModule({
  imports: [
    SharedModule,
    TransportManagementStageRouting
  ],
  declarations: [
    TransportManagementStageComponent,
    ListTransportManagementStageComponent,
    EditAndDetailTransportManagementStageComponent,
    AddTransportManagementStageComponent
  ],
  providers: [
    StageService
  ],
})
export class TransportManagementStageModule { }
