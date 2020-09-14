"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AddStaffManagementAc {
    constructor() {
        this.MiddleName = '';
    }
}
exports.AddStaffManagementAc = AddStaffManagementAc;
var MaritalStatusEnum;
(function (MaritalStatusEnum) {
    MaritalStatusEnum[MaritalStatusEnum["Married"] = 0] = "Married";
    MaritalStatusEnum[MaritalStatusEnum["Single"] = 1] = "Single";
    MaritalStatusEnum[MaritalStatusEnum["Divorce"] = 2] = "Divorce";
})(MaritalStatusEnum = exports.MaritalStatusEnum || (exports.MaritalStatusEnum = {}));
class AddStaffExperienceMappingAc {
}
exports.AddStaffExperienceMappingAc = AddStaffExperienceMappingAc;
class StaffManagementResponse {
}
exports.StaffManagementResponse = StaffManagementResponse;
var StaffManagementResponseType;
(function (StaffManagementResponseType) {
    StaffManagementResponseType[StaffManagementResponseType["EmployeeId"] = 0] = "EmployeeId";
    StaffManagementResponseType[StaffManagementResponseType["FirstName"] = 1] = "FirstName";
    StaffManagementResponseType[StaffManagementResponseType["LastName"] = 2] = "LastName";
    StaffManagementResponseType[StaffManagementResponseType["MaritalStatusId"] = 3] = "MaritalStatusId";
    StaffManagementResponseType[StaffManagementResponseType["TeachingStaffId"] = 4] = "TeachingStaffId";
    StaffManagementResponseType[StaffManagementResponseType["DesignationId"] = 5] = "DesignationId";
    StaffManagementResponseType[StaffManagementResponseType["NationalityId"] = 6] = "NationalityId";
    StaffManagementResponseType[StaffManagementResponseType["MotherTongueId"] = 7] = "MotherTongueId";
    StaffManagementResponseType[StaffManagementResponseType["ReligionId"] = 8] = "ReligionId";
    StaffManagementResponseType[StaffManagementResponseType["CasteId"] = 9] = "CasteId";
    StaffManagementResponseType[StaffManagementResponseType["BloodGroupId"] = 10] = "BloodGroupId";
    StaffManagementResponseType[StaffManagementResponseType["PassportIssuedCountryId"] = 11] = "PassportIssuedCountryId";
    StaffManagementResponseType[StaffManagementResponseType["PermanentAddress"] = 12] = "PermanentAddress";
    StaffManagementResponseType[StaffManagementResponseType["MobileNumber"] = 13] = "MobileNumber";
    StaffManagementResponseType[StaffManagementResponseType["PermanentCityId"] = 14] = "PermanentCityId";
    StaffManagementResponseType[StaffManagementResponseType["PresentCityId"] = 15] = "PresentCityId";
    StaffManagementResponseType[StaffManagementResponseType["Email"] = 16] = "Email";
    StaffManagementResponseType[StaffManagementResponseType["ExperienceList"] = 17] = "ExperienceList";
})(StaffManagementResponseType = exports.StaffManagementResponseType || (exports.StaffManagementResponseType = {}));
class EditStaffManagementAc {
    constructor() {
        this.MiddleName = '';
        this.GalleryImageToDelete = [];
    }
}
exports.EditStaffManagementAc = EditStaffManagementAc;
class AddStaffDocumentMappingAc {
}
exports.AddStaffDocumentMappingAc = AddStaffDocumentMappingAc;
//# sourceMappingURL=staff-management-information.model.js.map