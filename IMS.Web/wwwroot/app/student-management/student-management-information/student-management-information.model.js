"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AddStudentManagementAc {
    constructor() {
        this.MiddleName = '';
    }
}
exports.AddStudentManagementAc = AddStudentManagementAc;
var StudentSectionEnum;
(function (StudentSectionEnum) {
    StudentSectionEnum[StudentSectionEnum["A"] = 0] = "A";
    StudentSectionEnum[StudentSectionEnum["B"] = 1] = "B";
    StudentSectionEnum[StudentSectionEnum["C"] = 2] = "C";
    StudentSectionEnum[StudentSectionEnum["D"] = 3] = "D";
})(StudentSectionEnum = exports.StudentSectionEnum || (exports.StudentSectionEnum = {}));
var MaritalStatusEnum;
(function (MaritalStatusEnum) {
    MaritalStatusEnum[MaritalStatusEnum["Married"] = 0] = "Married";
    MaritalStatusEnum[MaritalStatusEnum["Single"] = 1] = "Single";
    MaritalStatusEnum[MaritalStatusEnum["Divorce"] = 2] = "Divorce";
})(MaritalStatusEnum = exports.MaritalStatusEnum || (exports.MaritalStatusEnum = {}));
var RelievingTypeEnum;
(function (RelievingTypeEnum) {
    RelievingTypeEnum[RelievingTypeEnum["PassOut"] = 0] = "PassOut";
    RelievingTypeEnum[RelievingTypeEnum["Transfer"] = 1] = "Transfer";
})(RelievingTypeEnum = exports.RelievingTypeEnum || (exports.RelievingTypeEnum = {}));
class ClassModel {
}
exports.ClassModel = ClassModel;
var FamilyRelationTypeEnum;
(function (FamilyRelationTypeEnum) {
    FamilyRelationTypeEnum[FamilyRelationTypeEnum["Father"] = 0] = "Father";
    FamilyRelationTypeEnum[FamilyRelationTypeEnum["Mother"] = 1] = "Mother";
    FamilyRelationTypeEnum[FamilyRelationTypeEnum["Sibling"] = 2] = "Sibling";
    FamilyRelationTypeEnum[FamilyRelationTypeEnum["Other"] = 3] = "Other";
})(FamilyRelationTypeEnum = exports.FamilyRelationTypeEnum || (exports.FamilyRelationTypeEnum = {}));
class AddStudentPriorEducationAc {
}
exports.AddStudentPriorEducationAc = AddStudentPriorEducationAc;
class AddStudentSportAc {
}
exports.AddStudentSportAc = AddStudentSportAc;
class AddStudentAwardAc {
}
exports.AddStudentAwardAc = AddStudentAwardAc;
class AddStudentDisciplineAc {
}
exports.AddStudentDisciplineAc = AddStudentDisciplineAc;
class StudentManagementResponse {
}
exports.StudentManagementResponse = StudentManagementResponse;
var StudentManagementResponseType;
(function (StudentManagementResponseType) {
    StudentManagementResponseType[StudentManagementResponseType["RollNumber"] = 0] = "RollNumber";
    StudentManagementResponseType[StudentManagementResponseType["AdmissionNumber"] = 1] = "AdmissionNumber";
    StudentManagementResponseType[StudentManagementResponseType["AdmissionClassId"] = 2] = "AdmissionClassId";
    StudentManagementResponseType[StudentManagementResponseType["CurrentClassId"] = 3] = "CurrentClassId";
    StudentManagementResponseType[StudentManagementResponseType["CurrentAcademicYearId"] = 4] = "CurrentAcademicYearId";
    StudentManagementResponseType[StudentManagementResponseType["FirstLanguageId"] = 5] = "FirstLanguageId";
    StudentManagementResponseType[StudentManagementResponseType["SecondLanguageId"] = 6] = "SecondLanguageId";
    StudentManagementResponseType[StudentManagementResponseType["GenderId"] = 7] = "GenderId";
    StudentManagementResponseType[StudentManagementResponseType["FirstName"] = 8] = "FirstName";
    StudentManagementResponseType[StudentManagementResponseType["LastName"] = 9] = "LastName";
    StudentManagementResponseType[StudentManagementResponseType["FeeChallanNumber"] = 10] = "FeeChallanNumber";
    StudentManagementResponseType[StudentManagementResponseType["NationalityId"] = 11] = "NationalityId";
    StudentManagementResponseType[StudentManagementResponseType["MotherTongueId"] = 12] = "MotherTongueId";
    StudentManagementResponseType[StudentManagementResponseType["ReligionId"] = 13] = "ReligionId";
    StudentManagementResponseType[StudentManagementResponseType["CasteId"] = 14] = "CasteId";
    StudentManagementResponseType[StudentManagementResponseType["BloodGroupId"] = 15] = "BloodGroupId";
    StudentManagementResponseType[StudentManagementResponseType["PassportIssuedCountryId"] = 16] = "PassportIssuedCountryId";
    StudentManagementResponseType[StudentManagementResponseType["RelievingClassId"] = 17] = "RelievingClassId";
    StudentManagementResponseType[StudentManagementResponseType["MotherName"] = 18] = "MotherName";
    StudentManagementResponseType[StudentManagementResponseType["FamilyRelationName"] = 19] = "FamilyRelationName";
    StudentManagementResponseType[StudentManagementResponseType["FamilyRelationMobileNumber"] = 20] = "FamilyRelationMobileNumber";
    StudentManagementResponseType[StudentManagementResponseType["FamilyRelationOccupationId"] = 21] = "FamilyRelationOccupationId";
    StudentManagementResponseType[StudentManagementResponseType["PermanentAddress"] = 22] = "PermanentAddress";
    StudentManagementResponseType[StudentManagementResponseType["PermanentCityId"] = 23] = "PermanentCityId";
    StudentManagementResponseType[StudentManagementResponseType["PresentCityId"] = 24] = "PresentCityId";
    StudentManagementResponseType[StudentManagementResponseType["MobileNumber"] = 25] = "MobileNumber";
    StudentManagementResponseType[StudentManagementResponseType["StudentPriorEducations"] = 26] = "StudentPriorEducations";
    StudentManagementResponseType[StudentManagementResponseType["StudentDisciplines"] = 27] = "StudentDisciplines";
    StudentManagementResponseType[StudentManagementResponseType["StudentSportId"] = 28] = "StudentSportId";
    StudentManagementResponseType[StudentManagementResponseType["StudentLevelId"] = 29] = "StudentLevelId";
    StudentManagementResponseType[StudentManagementResponseType["StudentAwardName"] = 30] = "StudentAwardName";
    StudentManagementResponseType[StudentManagementResponseType["StudentAwardInstituteName"] = 31] = "StudentAwardInstituteName";
})(StudentManagementResponseType = exports.StudentManagementResponseType || (exports.StudentManagementResponseType = {}));
class UpdateStudentManagementAc {
    constructor() {
        this.MiddleName = '';
        this.GalleryImageToDelete = [];
        this.DocumentToDelete = [];
    }
}
exports.UpdateStudentManagementAc = UpdateStudentManagementAc;
class AddStudentDocumentMappingAc {
}
exports.AddStudentDocumentMappingAc = AddStudentDocumentMappingAc;
//# sourceMappingURL=student-management-information.model.js.map