import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ClassManagementRouting } from './institute-management-class.routes';
import { ClassManagementComponent } from './institute-management-class.component';
import { ListClassManagementComponent } from './institute-management-class-list/institute-management-class-list.component';
import { AddClassManagementComponent } from './institute-management-class-add/institute-management-class-add.component';
import { EditDetailsClassManagementComponent } from './institute-management-class-edit-details/institute-management-class-edit-details';
import { ClassManagementService } from './institute-management-class.service';

@NgModule({
    imports: [
        SharedModule,
        //ClassManagementRouting
    ],
    declarations: [
        ClassManagementComponent,
        ListClassManagementComponent,
        AddClassManagementComponent,
        EditDetailsClassManagementComponent
    ],
    providers: [
        ClassManagementService
    ],
})
export class ClassManagementModule { }
