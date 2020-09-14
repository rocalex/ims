"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AddInstituteSubject {
    constructor() {
        this.IsGroup = false;
    }
}
exports.AddInstituteSubject = AddInstituteSubject;
class UpdateInstituteSubject {
    constructor() {
        this.IsGroup = false;
    }
}
exports.UpdateInstituteSubject = UpdateInstituteSubject;
var InstituteSubjectResponseType;
(function (InstituteSubjectResponseType) {
    InstituteSubjectResponseType[InstituteSubjectResponseType["Code"] = 0] = "Code";
    InstituteSubjectResponseType[InstituteSubjectResponseType["Name"] = 1] = "Name";
    InstituteSubjectResponseType[InstituteSubjectResponseType["Other"] = 2] = "Other";
})(InstituteSubjectResponseType = exports.InstituteSubjectResponseType || (exports.InstituteSubjectResponseType = {}));
class InstituteSubjectResponse {
    constructor() {
        this.HasError = false;
    }
}
exports.InstituteSubjectResponse = InstituteSubjectResponse;
//# sourceMappingURL=institute-management-subject.model.js.map