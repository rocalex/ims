import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { InstituteManagementComponent } from './institute-management.component';
import { InstituteManagementRouting } from './institute-management.routes';

// Academic Year
import { AcademicYearManagementModule } from './institute-management-academic-year/institute-management-academic-year.module';

// Week Off
import { WeekOffManagementModule } from './institute-management-week-off/institute-management-week-off.module';

// Holiday Off
import { HolidayOffManagementModule } from './institute-management-holiday-off/institute-management-holiday-off.module';
import { ClassManagementModule } from './institute-management-class/institute-management-class.module';
import { SubjectManagementModule } from './institute-management-subject/institute-management-subject.module';
import { ClassSubjectMappingManagementModule } from './institute-management-class-subject-mapping/institute-management-class-subject-mapping.module';
import { TimeTableManagementModule } from './institute-management-time-table/institute-management-time-table.module';

@NgModule({
    imports: [
        SharedModule,
        InstituteManagementRouting,
        AcademicYearManagementModule,
        WeekOffManagementModule,
        HolidayOffManagementModule,
        ClassManagementModule,
        SubjectManagementModule,
        ClassSubjectMappingManagementModule,
        TimeTableManagementModule
    ],
    declarations: [
        InstituteManagementComponent
    ],
    providers: [
    ],
})
export class InstituteManagementModule { }
