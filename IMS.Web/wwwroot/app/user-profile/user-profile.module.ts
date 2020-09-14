import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { UserProfileService } from './user-profile.service';
import { UserProfileManagementRouting } from './user-profile.routes';
import { UserProfileComponent } from './user-profile.component';

@NgModule({
    imports: [
        SharedModule,
        UserProfileManagementRouting
    ],
    declarations: [
        UserProfileComponent
    ],
    providers: [
        UserProfileService
    ],
})
export class UserProfileModule { }
