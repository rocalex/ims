import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { StaffDepartmentManagementRouting } from './staff-management-department.routes';

import { StaffDepartmentManagementComponent } from './staff-management-department.component';
import { ListDepartmentManagementComponent } from './staff-management-department-list/staff-management-department-list.component';
import { AddDepartmentManagementComponent } from './staff-management-department-add/staff-management-department-add.component';
import { EditDetailsDepartmentManagementComponent } from './staff-management-department-edit-details/staff-management-department-edit-details.component';
import { StaffDepartmentManagementService } from './staff-management-department.service';

@NgModule({
    imports: [
        SharedModule,
        StaffDepartmentManagementRouting
    ],
    declarations: [
        StaffDepartmentManagementComponent,
        ListDepartmentManagementComponent,
        AddDepartmentManagementComponent,
        EditDetailsDepartmentManagementComponent
    ],
    providers: [
        StaffDepartmentManagementService
    ],
})
export class StaffDepartmentManagementModule { }
