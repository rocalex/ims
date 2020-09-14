import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

import { EventManagementReportService } from './event-management-report.service';

import { EventManagementReportComponent } from './event-management-report.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        EventManagementReportComponent
    ],
    providers: [
        EventManagementReportService
    ]
})
export class EventManagementReportModule { }
