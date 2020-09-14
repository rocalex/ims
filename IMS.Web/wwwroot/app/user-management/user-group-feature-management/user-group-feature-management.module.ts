import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { UserGroupFeatureManagementRouting } from './user-group-feature-management.routes';
import { UserGroupFeatureManagementService } from './user-group-feature-management.service';
import { UserGroupFeatureManagementComponent } from './user-group-feature-management.component';
import { ListUserGroupFeatureManagementComponent } from './user-group-feature-management-list/user-group-feature-management-list.component';
import { EditAndDetailUserGroupFeatureManagementComponent } from './user-group-feature-management-edit-detail/user-group-feature-management-edit-detail.component';

@NgModule({
  imports: [
    SharedModule,
    //UserGroupFeatureManagementRouting
  ],
  declarations: [
    UserGroupFeatureManagementComponent,
    ListUserGroupFeatureManagementComponent,
    EditAndDetailUserGroupFeatureManagementComponent
  ],
  providers: [
    UserGroupFeatureManagementService
  ],
})
export class UserGroupFeatureManagementModule { }
