"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../../shared/shared.module");
const student_management_lookup_routes_1 = require("./student-management-lookup.routes");
const student_management_lookup_component_1 = require("./student-management-lookup.component");
const student_management_nationality_module_1 = require("./student-management-nationality/student-management-nationality.module");
const student_management_religion_module_1 = require("./student-management-religion/student-management-religion.module");
const student_management_caste_module_1 = require("./student-management-caste/student-management-caste.module");
const student_management_relationship_module_1 = require("./student-management-relationship/student-management-relationship.module");
const student_management_occupation_module_1 = require("./student-management-occupation/student-management-occupation.module");
const student_management_religion_category_module_1 = require("./student-management-religion-category/student-management-religion-category.module");
const student_management_mother_tongue_module_1 = require("./student-management-mother-tongue/student-management-mother-tongue.module");
const student_management_blood_group_module_1 = require("./student-management-blood-group/student-management-blood-group.module");
const student_management_level_module_1 = require("./student-management-level/student-management-level.module");
const student_management_sport_detail_module_1 = require("./student-management-sport-detail/student-management-sport-detail.module");
const student_management_qualification_module_1 = require("./student-management-qualification/student-management-qualification.module");
const student_management_gender_module_1 = require("./student-management-gender/student-management-gender.module");
const student_management_maritalstatus_module_1 = require("./student-management-maritalstatus/student-management-maritalstatus.module");
const student_management_section_module_1 = require("./student-management-section/student-management-section.module");
const student_management_teachingstaff_module_1 = require("./student-management-teachingstaff/student-management-teachingstaff.module");
const student_management_slab_module_1 = require("./student-management-slab/student-management-slab.module");
const student_management_meetingagenda_module_1 = require("./student-management-meetingagenda/student-management-meetingagenda.module");
const student_management_activitystatus_module_1 = require("./student-management-activitystatus/student-management-activitystatus.module");
const student_management_disciplinarystatus_module_1 = require("./student-management-disciplinarystatus/student-management-disciplinarystatus.module");
const student_management_leavetype_module_1 = require("./student-management-leavetype/student-management-leavetype.module");
const student_management_language_module_1 = require("./student-management-language/student-management-language.module");
let StudentManagementLookupModule = class StudentManagementLookupModule {
};
StudentManagementLookupModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            student_management_lookup_routes_1.StudentManagementLookUpRouting,
            student_management_nationality_module_1.NationalityManagementModule,
            student_management_religion_module_1.ReligionManagementModule,
            student_management_caste_module_1.CasteManagementModule,
            student_management_relationship_module_1.RelationshipManagementModule,
            student_management_occupation_module_1.OccupationManagementModule,
            student_management_religion_category_module_1.ReligionCategoryManagementModule,
            student_management_mother_tongue_module_1.MotherTongueManagementModule,
            student_management_blood_group_module_1.BloodGroupManagementModule,
            student_management_level_module_1.LevelManagementModule,
            student_management_sport_detail_module_1.SportDetailManagementModule,
            student_management_qualification_module_1.QualificationManagementModule,
            student_management_gender_module_1.GenderManagementModule,
            student_management_maritalstatus_module_1.MaritalStatusManagementModule,
            student_management_section_module_1.SectionManagementModule,
            student_management_teachingstaff_module_1.TeachingStaffManagementModule,
            student_management_slab_module_1.SlabManagementModule,
            student_management_meetingagenda_module_1.MeetingAgendaManagementModule,
            student_management_activitystatus_module_1.ActivityStatusManagementModule,
            student_management_disciplinarystatus_module_1.DisciplinaryStatusManagementModule,
            student_management_leavetype_module_1.LeaveTypeManagementModule,
            student_management_language_module_1.LanguageManagementModule
        ],
        declarations: [
            student_management_lookup_component_1.StudentManagementLookUpComponent
        ],
        providers: [],
    })
], StudentManagementLookupModule);
exports.StudentManagementLookupModule = StudentManagementLookupModule;
//# sourceMappingURL=student-management-lookup.module.js.map