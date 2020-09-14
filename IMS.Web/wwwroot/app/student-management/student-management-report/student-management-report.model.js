"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReportAc {
}
exports.ReportAc = ReportAc;
function getStudentList() {
    var list = [
        { Name: 'List Of Student', Type: 'Report', Order: 1 },
        { Name: 'Class Wise Student', Type: 'Report', Order: 2 },
        { Name: 'Religion Wise Student', Type: 'Report', Order: 3 },
        { Name: 'Gender Wise Student', Type: 'Report', Order: 4 },
        { Name: 'Student Attendance', Type: 'Report', Order: 5 },
        { Name: 'Consolidated Attendance', Type: 'Report', Order: 6 },
        { Name: 'Notice/Homework/Dairy', Type: 'Report', Order: 7 },
        { Name: 'Student Result', Type: 'Report', Order: 8 }
    ];
    return list;
}
exports.getStudentList = getStudentList;
function getStudentChartList() {
    var list = [
        { Name: 'List Of Student', Type: 'Chart', Order: 1 },
        { Name: 'Class Wise Student', Type: 'Chart', Order: 2 },
        { Name: 'Religion Wise Student', Type: 'Chart', Order: 3 },
    ];
    return list;
}
exports.getStudentChartList = getStudentChartList;
//# sourceMappingURL=student-management-report.model.js.map