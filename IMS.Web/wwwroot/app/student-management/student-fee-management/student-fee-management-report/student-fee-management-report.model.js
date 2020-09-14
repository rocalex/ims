"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReportAc {
}
exports.ReportAc = ReportAc;
function getStudentList() {
    var list = [
        { Name: 'List Of Payments', Type: 'Report', Order: 1 },
        { Name: 'Class Wise Payments', Type: 'Report', Order: 2 },
        { Name: 'Class wise Pending Payments', Type: 'Report', Order: 3 },
        { Name: 'Refund Payments', Type: 'Report', Order: 4 },
        { Name: 'Student wise Pending Payments', Type: 'Report', Order: 5 },
        { Name: 'Religion Wise Payments', Type: 'Report', Order: 6 }
    ];
    return list;
}
exports.getStudentList = getStudentList;
//# sourceMappingURL=student-fee-management-report.model.js.map