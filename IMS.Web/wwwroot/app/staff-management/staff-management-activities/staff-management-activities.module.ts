import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StaffManagementActivitiesRouting } from './staff-management-activities.routes';
import { StaffManagementActivitiesComponent } from './staff-management-activities.component';
import { StaffActivityManagementModule } from './staff-management-activity/staff-management-activity.module';
import { StaffManagementHomeworkModule } from './staff-management-homework/staff-management-homework.module';
import { StaffDisciplinaryManagementModule } from './staff-management-disciplinary/staff-management-disciplinary.module';
import { StaffNoticeManagementModule } from './staff-management-notice/staff-management-notice.module';

@NgModule({
    imports: [
        SharedModule,
        StaffManagementActivitiesRouting,
        StaffActivityManagementModule,
        StaffManagementHomeworkModule,
        StaffDisciplinaryManagementModule,
        StaffNoticeManagementModule
    ],
    declarations: [
        StaffManagementActivitiesComponent
    ],
    providers: [ ],
})
export class StaffManagementActivitiesModule { }
