import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { EventManagementRoutes } from './event-management.routes';
import { EventManagementComponent } from './event-management.component';

import { EventManagementInfoModule } from './event-management-info/event-management-info.module';
import { EventManagementReportModule } from './event-management-report/event-management-report.module';

@NgModule({
    imports: [
        SharedModule,
        //EventManagementRoutes,
        EventManagementInfoModule,
        EventManagementReportModule
    ],
    declarations: [
        EventManagementComponent
    ],
    providers: [
    ],
})
export class EventManagementModule { }
