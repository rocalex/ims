import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { SportDetailManagementRouting } from './student-management-sport-detail.routes';
import { SportDetailManagementComponent } from './student-management-sport-detail.component';
import { ListSportDetailManagementComponent } from './student-management-sport-detail-list/student-management-sport-detail-list.component';
import { AddSportDetailManagementComponent } from './student-management-sport-detail-add/student-management-sport-detail-add.component';
import { EditAndDetailSportDetailManagementComponent } from './student-management-sport-detail-edit-detail/student-management-sport-detail-edit-detail.component';
import { SportDetailManagementService } from './student-management-sport-detail.service';

@NgModule({
  imports: [
    SharedModule,
    //SportDetailManagementRouting
  ],
  declarations: [
    SportDetailManagementComponent,
    ListSportDetailManagementComponent,
    AddSportDetailManagementComponent,
    EditAndDetailSportDetailManagementComponent
  ],
  providers: [
    SportDetailManagementService
  ],
})
export class SportDetailManagementModule { }
