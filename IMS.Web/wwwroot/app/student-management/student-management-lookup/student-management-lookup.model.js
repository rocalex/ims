"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LookUpModel {
}
exports.LookUpModel = LookUpModel;
function Lookups() {
    var list = [
        { Name: 'Blood Group', Url: 'bloodgroup', Icon: 'zmdi zmdi-eyedropper' },
        { Name: 'Caste', Url: 'caste', Icon: 'zmdi zmdi-info' },
        { Name: 'Gender', Url: 'gender', Icon: 'zmdi zmdi-male-female' },
        { Name: 'Level', Url: 'level', Icon: 'zmdi zmdi-group' },
        { Name: 'Mother Tongue', Url: 'mothertongue', Icon: 'zmdi zmdi-translate' },
        { Name: 'Nationality', Url: 'nationality', Icon: 'zmdi zmdi-globe' },
        { Name: 'Occupation', Url: 'occupation', Icon: 'zmdi zmdi-assignment-account' },
        { Name: 'Qualification', Url: 'qualification', Icon: 'zmdi zmdi-graduation-cap' },
        { Name: 'Relationship', Url: 'relationship', Icon: 'zmdi zmdi-accounts-alt' },
        { Name: 'Religion', Url: 'religion', Icon: 'zmdi zmdi-city' },
        //{ Name: 'Religion Category', Url: 'religioncategory', Icon: 'zmdi zmdi-city' },
        { Name: 'Sport Detail', Url: 'sportdetail', Icon: 'zmdi zmdi-run' },
        { Name: 'Marital Status', Url: 'maritalstatus', Icon: 'zmdi zmdi-male-female' },
        { Name: 'Section', Url: 'section', Icon: 'zmdi zmdi-view-quilt' },
        { Name: 'Teaching Staff', Url: 'teachingstaff', Icon: 'zmdi zmdi-assignment' },
        { Name: 'Slab', Url: 'slab', Icon: 'zmdi zmdi-view-day' },
        { Name: 'Meeting Agenda', Url: 'meetingagenda', Icon: 'zmdi zmdi-account-box-phone' },
        { Name: 'Activity Status', Url: 'activitystatus', Icon: 'zmdi zmdi-accounts-list' },
        { Name: 'Disciplinary Status', Url: 'disciplinarystatus', Icon: 'zmdi zmdi-accounts-list' },
        { Name: 'Leave Type', Url: 'leavetype', Icon: 'zmdi zmdi-format-subject' },
        { Name: 'Language', Url: 'language', Icon: 'zmdi zmdi-assignment' }
    ];
    return list;
}
exports.Lookups = Lookups;
class BaseModelLookUp {
    constructor() {
        this.IsEditable = true;
    }
}
exports.BaseModelLookUp = BaseModelLookUp;
class LookUpResponse {
}
exports.LookUpResponse = LookUpResponse;
var LookUpResponseType;
(function (LookUpResponseType) {
    LookUpResponseType[LookUpResponseType["Name"] = 0] = "Name";
    LookUpResponseType[LookUpResponseType["Code"] = 1] = "Code";
})(LookUpResponseType = exports.LookUpResponseType || (exports.LookUpResponseType = {}));
//# sourceMappingURL=student-management-lookup.model.js.map