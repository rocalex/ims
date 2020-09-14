"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetStudentAttendanceManagementAc {
}
exports.GetStudentAttendanceManagementAc = GetStudentAttendanceManagementAc;
class AddStudentAttendanceManagementAc {
    constructor() {
        this.AttendanceDates = [];
        this.AttendanceType = [];
    }
}
exports.AddStudentAttendanceManagementAc = AddStudentAttendanceManagementAc;
var AttendanceType;
(function (AttendanceType) {
    AttendanceType["None"] = "None";
    AttendanceType["Present"] = "Present";
    AttendanceType["Absent"] = "Absent";
    AttendanceType["Leave"] = "Leave";
    AttendanceType["HalfLeave"] = "Half Leave";
})(AttendanceType = exports.AttendanceType || (exports.AttendanceType = {}));
class AddStudentAttendanceManagementWrapperAc {
    constructor() {
        this.Students = [];
    }
}
exports.AddStudentAttendanceManagementWrapperAc = AddStudentAttendanceManagementWrapperAc;
//# sourceMappingURL=student-management-attendance.model.js.map