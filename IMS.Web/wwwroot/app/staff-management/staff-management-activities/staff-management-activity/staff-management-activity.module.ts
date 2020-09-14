import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';

import { StaffActivityManagementRouting } from './staff-management-activity.routes';
import { StaffActivityManagementService } from './staff-management-activity.service';
import { StaffActivityManagementComponent } from './staff-management-activity.component';
import { ListStaffActivityManagementComponent } from './staff-management-activity-list/staff-management-activity-list.component';
import { AddStaffActivityManagementComponent } from './staff-management-activity-add/staff-management-activity-add.component';
import { EditDetailsStaffActivityManagementComponent } from './staff-management-activity-edit-details/staff-management-activity-edit-details.component';

@NgModule({
    imports: [
        SharedModule,
        //StaffActivityManagementRouting
    ],
    declarations: [
        StaffActivityManagementComponent,
        ListStaffActivityManagementComponent,
        AddStaffActivityManagementComponent,
        EditDetailsStaffActivityManagementComponent
    ],
    providers: [
        StaffActivityManagementService
    ],
})
export class StaffActivityManagementModule { }
