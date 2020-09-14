"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDashboardModel {
}
exports.UserDashboardModel = UserDashboardModel;
var UserDashboardTypeEnum;
(function (UserDashboardTypeEnum) {
    UserDashboardTypeEnum[UserDashboardTypeEnum["Student"] = 0] = "Student";
    UserDashboardTypeEnum[UserDashboardTypeEnum["Staff"] = 1] = "Staff";
})(UserDashboardTypeEnum = exports.UserDashboardTypeEnum || (exports.UserDashboardTypeEnum = {}));
class Attendance {
}
exports.Attendance = Attendance;
var AttendanceType;
(function (AttendanceType) {
    AttendanceType["None"] = "None";
    AttendanceType["Present"] = "Present";
    AttendanceType["Absent"] = "Absent";
    AttendanceType["Leave"] = "Leave";
    AttendanceType["HalfLeave"] = "Half Leave";
})(AttendanceType = exports.AttendanceType || (exports.AttendanceType = {}));
//# sourceMappingURL=dashboard.model.js.map