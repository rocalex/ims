import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { NotificationManagementComponent } from './notification-management.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        NotificationManagementComponent
    ],
    providers: [ ],
})
export class NotificationManagementModule { }
