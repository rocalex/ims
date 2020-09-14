"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AddInstituteClass {
    constructor() {
        this.IsGroup = false;
    }
}
exports.AddInstituteClass = AddInstituteClass;
class UpdateInstituteClass {
    constructor() {
        this.IsGroup = false;
    }
}
exports.UpdateInstituteClass = UpdateInstituteClass;
var InstituteClassDurationUnitEnum;
(function (InstituteClassDurationUnitEnum) {
    InstituteClassDurationUnitEnum[InstituteClassDurationUnitEnum["Days"] = 0] = "Days";
    InstituteClassDurationUnitEnum[InstituteClassDurationUnitEnum["Weeks"] = 1] = "Weeks";
    InstituteClassDurationUnitEnum[InstituteClassDurationUnitEnum["Months"] = 2] = "Months";
    InstituteClassDurationUnitEnum[InstituteClassDurationUnitEnum["Years"] = 3] = "Years";
})(InstituteClassDurationUnitEnum = exports.InstituteClassDurationUnitEnum || (exports.InstituteClassDurationUnitEnum = {}));
var InstituteClassResponseType;
(function (InstituteClassResponseType) {
    InstituteClassResponseType[InstituteClassResponseType["GroupCode"] = 0] = "GroupCode";
    InstituteClassResponseType[InstituteClassResponseType["Name"] = 1] = "Name";
    InstituteClassResponseType[InstituteClassResponseType["Duration"] = 2] = "Duration";
    InstituteClassResponseType[InstituteClassResponseType["ClassOrder"] = 3] = "ClassOrder";
    InstituteClassResponseType[InstituteClassResponseType["NumberOfFeeTerms"] = 4] = "NumberOfFeeTerms";
    InstituteClassResponseType[InstituteClassResponseType["Other"] = 5] = "Other";
    InstituteClassResponseType[InstituteClassResponseType["ClassTeacherId"] = 6] = "ClassTeacherId";
})(InstituteClassResponseType = exports.InstituteClassResponseType || (exports.InstituteClassResponseType = {}));
class InstituteClassResponse {
    constructor() {
        this.HasError = false;
    }
}
exports.InstituteClassResponse = InstituteClassResponse;
//# sourceMappingURL=institute-management-class.model.js.map