import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StudentManagementLookUpRouting } from './student-management-lookup.routes';
import { StudentManagementLookUpComponent } from './student-management-lookup.component';
import { NationalityManagementModule } from './student-management-nationality/student-management-nationality.module';
import { ReligionManagementModule } from './student-management-religion/student-management-religion.module';
import { CasteManagementModule } from './student-management-caste/student-management-caste.module';
import { RelationshipManagementModule } from './student-management-relationship/student-management-relationship.module';
import { OccupationManagementModule } from './student-management-occupation/student-management-occupation.module';
import { ReligionCategoryManagementModule } from './student-management-religion-category/student-management-religion-category.module';
import { MotherTongueManagementModule } from './student-management-mother-tongue/student-management-mother-tongue.module';
import { BloodGroupManagementModule } from './student-management-blood-group/student-management-blood-group.module';
import { LevelManagementModule } from './student-management-level/student-management-level.module';
import { SportDetailManagementModule } from './student-management-sport-detail/student-management-sport-detail.module';
import { QualificationManagementModule } from './student-management-qualification/student-management-qualification.module';
import { GenderManagementModule } from './student-management-gender/student-management-gender.module';
import { MaritalStatusManagementModule } from './student-management-maritalstatus/student-management-maritalstatus.module';
import { SectionManagementModule } from './student-management-section/student-management-section.module';
import { TeachingStaffManagementModule } from './student-management-teachingstaff/student-management-teachingstaff.module';
import { SlabManagementModule } from './student-management-slab/student-management-slab.module';
import { MeetingAgendaManagementModule } from './student-management-meetingagenda/student-management-meetingagenda.module';
import { ActivityStatusManagementModule } from './student-management-activitystatus/student-management-activitystatus.module';
import { DisciplinaryStatusManagementModule } from './student-management-disciplinarystatus/student-management-disciplinarystatus.module';
import { LeaveTypeManagementModule } from './student-management-leavetype/student-management-leavetype.module';
import { LanguageManagementModule } from './student-management-language/student-management-language.module';

@NgModule({
  imports: [
    SharedModule,
    StudentManagementLookUpRouting,
    NationalityManagementModule,
    ReligionManagementModule,
    CasteManagementModule,
    RelationshipManagementModule,
    OccupationManagementModule,
    ReligionCategoryManagementModule,
    MotherTongueManagementModule,
    BloodGroupManagementModule,
    LevelManagementModule,
    SportDetailManagementModule,
    QualificationManagementModule,
    GenderManagementModule,
    MaritalStatusManagementModule,
    SectionManagementModule,
    TeachingStaffManagementModule,
    SlabManagementModule,
    MeetingAgendaManagementModule,
    ActivityStatusManagementModule,
    DisciplinaryStatusManagementModule,
    LeaveTypeManagementModule,
    LanguageManagementModule
  ],
  declarations: [
    StudentManagementLookUpComponent
  ],
  providers: [
  ],
})
export class StudentManagementLookupModule { }
