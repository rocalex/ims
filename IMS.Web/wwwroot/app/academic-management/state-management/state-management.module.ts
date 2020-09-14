import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StateManagementRouting } from './state-management.routes';
import { StateManagementComponent } from './state-management.component';
import { AddStateManagementComponent } from './state-management-add/state-management-add.component';
import { EditAndDetailStateManagementComponent } from './state-management-edit-detail/state-management-edit-detail.component';
import { ListStateManagementComponent } from './state-management-list/state-management-list.component';
import { StateManagementService } from './state-management.service';

@NgModule({
  imports: [
    SharedModule,
    //StateManagementRouting
  ],
  declarations: [
    StateManagementComponent,
    AddStateManagementComponent,
    EditAndDetailStateManagementComponent,
    ListStateManagementComponent
  ],
  providers: [
    StateManagementService
  ],
})
export class StateManagementModule { }
