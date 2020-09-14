import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

import { MeetingAgendaManagementComponent } from './student-management-meetingagenda.component';
import { ListMeetingAgendaManagementComponent } from './student-management-meetingagenda-list/student-management-meetingagenda-list.component';
import { AddMeetingAgendaManagementComponent } from './student-management-meetingagenda-add/student-management-meetingagenda-add.component';
import { EditAndDetailMeetingAgendaManagementComponent } from './student-management-meetingagenda-edit-detail/student-management-meetingagenda-edit-detail.component';

import { MeetingAgendaManagementService } from './student-management-meetingagenda.service';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        MeetingAgendaManagementComponent,
        ListMeetingAgendaManagementComponent,
        AddMeetingAgendaManagementComponent,
        EditAndDetailMeetingAgendaManagementComponent
    ],
    providers: [
        MeetingAgendaManagementService
    ],
})
export class MeetingAgendaManagementModule { }
