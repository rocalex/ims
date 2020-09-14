import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { SubjectManagementRouting } from './institute-management-subject.routes';
import { SubjectManagementComponent } from './institute-management-subject.component';
import { ListSubjectManagementComponent } from './institute-management-subject-list/institute-management-subject-list.component';
import { AddSubjectManagementComponent } from './institute-management-subject-add/institute-management-subject-add.component';
import { EditDetailsSubjectManagementComponent } from './institute-management-subject-edit-details/institute-management-subject-edit-details';
import { SubjectManagementService } from './institute-management-subject.service';

@NgModule({
    imports: [
        SharedModule,
        //SubjectManagementRouting
    ],
    declarations: [
        SubjectManagementComponent,
        ListSubjectManagementComponent,
        AddSubjectManagementComponent,
        EditDetailsSubjectManagementComponent
    ],
    providers: [
        SubjectManagementService
    ],
})
export class SubjectManagementModule { }
