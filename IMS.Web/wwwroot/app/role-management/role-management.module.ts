import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoleManagementService } from './role-management.service';
import { RoleManagementListComponent } from './role-management-list/role-management-list.component';
import { RoleManagementAddComponent } from './role-management-add/role-management-add.component';
import { RoleManagementComponent } from './role-management.component';
import { RoleManagementRouting } from './role-management.routes';

@NgModule({
  imports: [
    SharedModule,
    RoleManagementRouting
  ],
  declarations: [
    RoleManagementComponent,
    RoleManagementAddComponent,
    RoleManagementListComponent
  ],
  providers: [
    RoleManagementService
  ],
})
export class RoleManagementModule { }
