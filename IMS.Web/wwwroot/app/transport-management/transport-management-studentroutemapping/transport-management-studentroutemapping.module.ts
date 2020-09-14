import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { TransportManagementStudentRouteMappingRouting } from './transport-management-studentroutemapping.routes';
import { TransportManagementStudentRouteMappingComponent } from './transport-management-studentroutemapping.component';
import { StudentRouteMappingService } from './transport-management-studentroutemapping.service';
import { ListTransportManagementStudentRouteMappingComponent } from './transport-management-studentroutemapping-list/transport-management-studentroutemapping-list.component';
import { EditAndDetailTransportManagementStudentRouteMappingComponent } from './transport-management-studentroutemapping-edit-detail/transport-management-studentroutemapping-edit-detail.component';


@NgModule({
  imports: [
    SharedModule,
    TransportManagementStudentRouteMappingRouting
  ],
  declarations: [
    TransportManagementStudentRouteMappingComponent,
    ListTransportManagementStudentRouteMappingComponent,
    EditAndDetailTransportManagementStudentRouteMappingComponent
  ],
  providers: [
    StudentRouteMappingService
  ],
})
export class TransportManagementStudentRouteMappingModule { }
