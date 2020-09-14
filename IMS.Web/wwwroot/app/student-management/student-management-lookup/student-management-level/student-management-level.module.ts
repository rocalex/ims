import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { LevelManagementRouting } from './student-management-level.routes';
import { LevelManagementComponent } from './student-management-level.component';
import { ListLevelManagementComponent } from './student-management-level-list/student-management-level-list.component';
import { AddLevelManagementComponent } from './student-management-level-add/student-management-level-add.component';
import { EditAndDetailLevelManagementComponent } from './student-management-level-edit-detail/student-management-level-edit-detail.component';
import { LevelManagementService } from './student-management-level.service';

@NgModule({
  imports: [
    SharedModule,
    //LevelManagementRouting
  ],
  declarations: [
    LevelManagementComponent,
    ListLevelManagementComponent,
    AddLevelManagementComponent,
    EditAndDetailLevelManagementComponent
  ],
  providers: [
    LevelManagementService
  ],
})
export class LevelManagementModule { }
