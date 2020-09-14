import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { ClassSubjectMappingManagementRouting } from './institute-management-class-subject-mapping.routes';
import { ClassSubjectMappingManagementService } from './institute-management-class-subject-mapping.service';

import { ClassSubjectMappingManagementComponent } from './institute-management-class-subject-mapping.component';
import { ListClassSubjectMappingManagementComponent } from './institute-management-class-subject-mapping-list/institute-management-class-subject-mapping-list.component';

@NgModule({
    imports: [
        SharedModule,
        //ClassSubjectMappingManagementRouting
    ],
    declarations: [
        ClassSubjectMappingManagementComponent,
        ListClassSubjectMappingManagementComponent
    ],
    providers: [
        ClassSubjectMappingManagementService
    ],
})
export class ClassSubjectMappingManagementModule { }
