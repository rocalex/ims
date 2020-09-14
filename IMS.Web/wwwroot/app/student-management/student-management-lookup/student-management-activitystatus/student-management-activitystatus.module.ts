import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

import { ActivityStatusManagementComponent } from './student-management-activitystatus.component';
import { ListActivityStatusManagementComponent } from './student-management-activitystatus-list/student-management-activitystatus-list.component';
import { AddActivityStatusManagementComponent } from './student-management-activitystatus-add/student-management-activitystatus-add.component';
import { EditAndDetailActivityStatusManagementComponent } from './student-management-activitystatus-edit-detail/student-management-activitystatus-edit-detail.component';

import { ActivityStatusManagementService } from './student-management-activitystatus.service';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        ActivityStatusManagementComponent,
        ListActivityStatusManagementComponent,
        AddActivityStatusManagementComponent,
        EditAndDetailActivityStatusManagementComponent
    ],
    providers: [
        ActivityStatusManagementService
    ],
})
export class ActivityStatusManagementModule { }
