import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { RelationshipManagementRouting } from './student-management-relationship.routes';
import { RelationshipManagementComponent } from './student-management-relationship.component';
import { ListRelationshipManagementComponent } from './student-management-relationship-list/student-management-relationship-list.component';
import { AddRelationshipManagementComponent } from './student-management-relationship-add/student-management-relationship-add.component';
import { EditAndDetailRelationshipManagementComponent } from './student-management-relationship-edit-detail/student-management-relationship-edit-detail.component';
import { RelationshipManagementService } from './student-management-relationship.service';

@NgModule({
  imports: [
    SharedModule,
    //RelationshipManagementRouting
  ],
  declarations: [
    RelationshipManagementComponent,
    ListRelationshipManagementComponent,
    AddRelationshipManagementComponent,
    EditAndDetailRelationshipManagementComponent
  ],
  providers: [
    RelationshipManagementService
  ],
})
export class RelationshipManagementModule { }
