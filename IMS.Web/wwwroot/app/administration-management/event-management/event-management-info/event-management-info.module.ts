import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

import { EventManagementRouting } from './event-management-info.routes';
import { EventManagementService } from './event-management-info.service';

import { EventManagementInfoComponent } from './event-management-info.component';
import { ListEventManagementComponent } from './event-management-info-list/event-management-info-list.component';
import { AddEventManagementComponent } from './event-management-info-add/event-management-info-add.component';
import { EditDetailEventManagementComponent } from './event-management-info-edit-detail/event-management-info-edit-detail.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        EventManagementInfoComponent,
        ListEventManagementComponent,
        AddEventManagementComponent,
        EditDetailEventManagementComponent
    ],
    providers: [
        EventManagementService
    ],
})
export class EventManagementInfoModule { }
