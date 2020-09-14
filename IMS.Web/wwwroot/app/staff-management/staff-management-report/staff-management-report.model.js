"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReportAc {
}
exports.ReportAc = ReportAc;
function getStaffList() {
    var list = [
        { Name: 'List Of Staff', Type: 'Report', Order: 1 },
        { Name: 'Class Wise Staff', Type: 'Report', Order: 2 },
        { Name: 'Religion Wise Staff', Type: 'Report', Order: 3 },
        //{ Name: 'Staff TimeTable', Type: 'Report', Order: 4 },
        { Name: 'Staff Attendance', Type: 'Report', Order: 5 },
        { Name: 'Consolidated Attendance', Type: 'Report', Order: 6 },
        { Name: 'Notice/Homework/Dairy', Type: 'Report', Order: 7 }
    ];
    return list;
}
exports.getStaffList = getStaffList;
function getStaffChartList() {
    var list = [
        { Name: 'List Of Staff', Type: 'Report', Order: 1 },
        { Name: 'Class Wise Staff', Type: 'Report', Order: 2 },
        { Name: 'Religion Wise Staff', Type: 'Report', Order: 3 },
        { Name: 'Subject Wise Staff', Type: 'Report', Order: 4 },
        //{ Name: 'Staff Attendance', Type: 'Report', Order: 5 },
        { Name: 'Teaching Type Staff', Type: 'Report', Order: 6 }
    ];
    return list;
}
exports.getStaffChartList = getStaffChartList;
//# sourceMappingURL=staff-management-report.model.js.map