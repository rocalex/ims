import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditDetailsComponent } from './user-edit-details/user-edit-details.component';

import { UserRouting } from './user.routes';
import { UserService } from './user.service';

@NgModule({
    imports: [
        SharedModule,
        //UserRouting
    ],
    declarations: [
        UserComponent,
        UserListComponent,
        UserAddComponent,
        UserEditDetailsComponent
    ],
    providers: [
        UserService
    ],
})
export class UserModule { }
