import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { UserGroupManagementComponent } from './user-group-management.component';
import { UserGroupManagementListComponent } from './user-group-management-list/user-group-management-list.component';
import { UserGroupManagementAddComponent } from './user-group-management-add/user-group-management-add.component';
import { UserGroupManagementEditDetailsComponent } from './user-group-management-edit-details/user-group-management-edit-details.component';

import { UserGroupManagementRouting } from './user-group-management.routes';
import { UserGroupManagementService } from './user-group-management.service';

@NgModule({
    imports: [
        SharedModule,
        //UserGroupManagementRouting
    ],
    declarations: [
        UserGroupManagementComponent,
        UserGroupManagementListComponent,
        UserGroupManagementAddComponent,
        UserGroupManagementEditDetailsComponent
    ],
    providers: [
        UserGroupManagementService
    ],
})
export class UserGroupManagementModule { }
