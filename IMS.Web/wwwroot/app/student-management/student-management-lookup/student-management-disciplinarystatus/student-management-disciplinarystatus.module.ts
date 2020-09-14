import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { DisciplinaryStatusManagementComponent } from './student-management-disciplinarystatus.component';
import { ListDisciplinaryStatusManagementComponent } from './student-management-disciplinarystatus-list/student-management-disciplinarystatus-list.component';
import { AddDisciplinaryStatusManagementComponent } from './student-management-disciplinarystatus-add/student-management-disciplinarystatus-add.component';
import { EditAndDetailDisciplinaryStatusManagementComponent } from './student-management-disciplinarystatus-edit-detail/student-management-disciplinarystatus-edit.component';
import { DisciplinaryStatusManagementService } from './student-management-disciplinarystatus.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    DisciplinaryStatusManagementComponent,
    ListDisciplinaryStatusManagementComponent,
    AddDisciplinaryStatusManagementComponent,
    EditAndDetailDisciplinaryStatusManagementComponent
  ],
  providers: [
    DisciplinaryStatusManagementService
  ],
})
export class DisciplinaryStatusManagementModule { }
