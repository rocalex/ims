"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetStaffAttendanceManagementAc {
}
exports.GetStaffAttendanceManagementAc = GetStaffAttendanceManagementAc;
class AddStaffAttendanceManagementAc {
    constructor() {
        this.AttendanceDates = [];
        this.AttendanceType = [];
    }
}
exports.AddStaffAttendanceManagementAc = AddStaffAttendanceManagementAc;
var AttendanceType;
(function (AttendanceType) {
    AttendanceType["None"] = "None";
    AttendanceType["Present"] = "Present";
    AttendanceType["Absent"] = "Absent";
    AttendanceType["Leave"] = "Leave";
    AttendanceType["HalfLeave"] = "Half Leave";
})(AttendanceType = exports.AttendanceType || (exports.AttendanceType = {}));
//# sourceMappingURL=staff-management-attendance.model.js.map