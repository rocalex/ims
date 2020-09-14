import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { StaffDesignationManagementRouting } from './staff-management-designation.routes';

import { StaffDesignationManagementComponent } from './staff-management-designation.component';
import { ListDesignationManagementComponent } from './staff-management-designation-list/staff-management-designation-list.component';
import { AddDesignationManagementComponent } from './staff-management-designation-add/staff-management-designation-add.component';
import { EditDetailsDesignationManagementComponent } from './staff-management-designation-edit-details/staff-management-designation-edit-details.component';
import { StaffDesignationManagementService } from './staff-management-designation.service';

@NgModule({
    imports: [
        SharedModule,
        StaffDesignationManagementRouting
    ],
    declarations: [
        StaffDesignationManagementComponent,
        ListDesignationManagementComponent,
        AddDesignationManagementComponent,
        EditDetailsDesignationManagementComponent
    ],
    providers: [
        StaffDesignationManagementService
    ],
})
export class StaffDesignationManagementModule { }
