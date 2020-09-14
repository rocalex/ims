"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserGroupFeature {
    constructor() {
        this.Child = [];
    }
}
exports.UserGroupFeature = UserGroupFeature;
class UserGroupFeatureChild {
}
exports.UserGroupFeatureChild = UserGroupFeatureChild;
class Actions {
}
exports.Actions = Actions;
var UserGroupFeatureParentEnum;
(function (UserGroupFeatureParentEnum) {
    //Academic = 'Academic',
    UserGroupFeatureParentEnum["Student"] = "Student";
    UserGroupFeatureParentEnum["Staff"] = "Staff";
    UserGroupFeatureParentEnum["Administration"] = "Administration";
    UserGroupFeatureParentEnum["Transportation"] = "Transportation";
    UserGroupFeatureParentEnum["Finance"] = "Finance";
})(UserGroupFeatureParentEnum = exports.UserGroupFeatureParentEnum || (exports.UserGroupFeatureParentEnum = {}));
//# sourceMappingURL=user-group-feature-management.model.js.map