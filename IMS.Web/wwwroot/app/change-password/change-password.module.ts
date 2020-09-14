import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordService } from './change-password.service';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        ChangePasswordComponent
    ],
    providers: [
        ChangePasswordService
    ],
})
export class ChangePasswordModule { }
