import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

import { StaffNoticeManagementComponent } from './staff-management-notice.component';
import { ListNoticeManagementComponent } from './staff-management-notice-list/staff-management-notice-list.component';
import { AddNoticeManagementComponent } from './staff-management-notice-add/staff-management-notice-add.component';
import { EditDetailsNoticeManagementComponent } from './staff-management-notice-edit-details/staff-management-notice-edit-details.component';

import { StaffNoticeManagementService } from './staff-management-notice.service';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        StaffNoticeManagementComponent,
        ListNoticeManagementComponent,
        AddNoticeManagementComponent,
        EditDetailsNoticeManagementComponent
    ],
    providers: [
        StaffNoticeManagementService
    ],
})
export class StaffNoticeManagementModule { }
