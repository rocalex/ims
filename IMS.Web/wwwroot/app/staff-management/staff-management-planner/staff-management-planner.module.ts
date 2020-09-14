import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';

import { StaffPlannerManagementRouting } from './staff-management-planner.routes';
import { StaffPlannerManagementService } from './staff-management-planner.service';
import { StaffPlannerManagementComponent } from './staff-management-planner.component';
import { ListStaffPlannerManagementComponent } from './staff-management-planner-list/staff-management-planner-list.component';
import { AddStaffPlannerManagementComponent } from './staff-management-planner-add/staff-management-planner-add.component';
import { EditDetailsStaffPlannerManagementComponent } from './staff-management-planner-edit-details/staff-management-planner-edit-details.component';

@NgModule({
    imports: [
        SharedModule,
        StaffPlannerManagementRouting
    ],
    declarations: [
        StaffPlannerManagementComponent,
        ListStaffPlannerManagementComponent,
        AddStaffPlannerManagementComponent,
        EditDetailsStaffPlannerManagementComponent
    ],
    providers: [
        StaffPlannerManagementService
    ],
})
export class StaffPlannerManagementModule { }
