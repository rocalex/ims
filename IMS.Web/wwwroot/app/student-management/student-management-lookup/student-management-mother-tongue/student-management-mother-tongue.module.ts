import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { MotherTongueManagementRouting } from './student-management-mother-tongue.routes';
import { MotherTongueManagementComponent } from './student-management-mother-tongue.component';
import { ListMotherTongueManagementComponent } from './student-management-mother-tongue-list/student-management-mother-tongue-list.component';
import { AddMotherTongueManagementComponent } from './student-management-mother-tongue-add/student-management-mother-tongue-add.component';
import { EditDetailsMotherTongueManagementComponent } from './student-management-mother-tongue-edit-details/student-management-mother-tongue-edit-details.component';
import { MotherTongueManagementService } from './student-management-mother-tongue.service';

@NgModule({
    imports: [
        SharedModule,
        //MotherTongueManagementRouting
    ],
    declarations: [
        MotherTongueManagementComponent,
        ListMotherTongueManagementComponent,
        AddMotherTongueManagementComponent,
        EditDetailsMotherTongueManagementComponent
    ],
    providers: [
        MotherTongueManagementService
    ],
})
export class MotherTongueManagementModule { }
