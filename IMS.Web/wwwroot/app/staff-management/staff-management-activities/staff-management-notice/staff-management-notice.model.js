"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NoticeToEnum;
(function (NoticeToEnum) {
    NoticeToEnum[NoticeToEnum["AllStudents"] = 0] = "AllStudents";
    NoticeToEnum[NoticeToEnum["AllStaffs"] = 1] = "AllStaffs";
    NoticeToEnum[NoticeToEnum["Student"] = 2] = "Student";
    NoticeToEnum[NoticeToEnum["Staff"] = 3] = "Staff";
    NoticeToEnum[NoticeToEnum["SystemUser"] = 4] = "SystemUser";
})(NoticeToEnum = exports.NoticeToEnum || (exports.NoticeToEnum = {}));
var NoticeTypeEnum;
(function (NoticeTypeEnum) {
    NoticeTypeEnum[NoticeTypeEnum["Notice"] = 0] = "Notice";
    NoticeTypeEnum[NoticeTypeEnum["Circular"] = 1] = "Circular";
})(NoticeTypeEnum = exports.NoticeTypeEnum || (exports.NoticeTypeEnum = {}));
class CircularNotice {
}
exports.CircularNotice = CircularNotice;
class CircularNoticeRecipient {
}
exports.CircularNoticeRecipient = CircularNoticeRecipient;
//# sourceMappingURL=staff-management-notice.model.js.map