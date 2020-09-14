import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { UserManagementRouting } from './user-management.routes';
import { UserManagementComponent } from './user-management.component';
import { UserModule } from './user/user.module';
import { UserGroupFeatureManagementModule } from './user-group-feature-management/user-group-feature-management.module';
import { UserGroupManagementModule } from './user-group-management/user-group-management.module';

@NgModule({
    imports: [
        SharedModule,
        UserManagementRouting,
        UserModule,
        UserGroupFeatureManagementModule,
        UserGroupManagementModule
    ],
    declarations: [
        UserManagementComponent
    ],
    providers: [
    ],
})
export class UserManagementModule { }
