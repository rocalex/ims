"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FeeManagementLookUpModel {
}
exports.FeeManagementLookUpModel = FeeManagementLookUpModel;
function FeeManagementLookUps() {
    var list = [
        { Name: 'Fee Component', Url: 'component', Icon: 'zmdi zmdi-money', Type: 'StudentFeeComponent' },
        { Name: 'Course Fee Terms', Url: 'coursefeeterms', Icon: 'zmdi zmdi-money', Type: 'StudentCourseFeeTerm' },
        { Name: 'Students Fee', Url: 'studentfee', Icon: 'zmdi zmdi-money', Type: 'StudentStudentFee' },
        { Name: 'Fee Receipt', Url: 'feereceipt', Icon: 'zmdi zmdi-receipt', Type: 'StudentFeeReceipt' },
        { Name: 'Fee Refund', Url: 'refund', Icon: 'zmdi zmdi-refresh', Type: 'StudentFeeRefund' },
        { Name: 'Fee Report', Url: 'report', Icon: 'zmdi zmdi-file-text', Type: 'StudentFeeReport' }
    ];
    return list;
}
exports.FeeManagementLookUps = FeeManagementLookUps;
var FeeComponentTypeEnum;
(function (FeeComponentTypeEnum) {
    FeeComponentTypeEnum[FeeComponentTypeEnum["ApplicableToAll"] = 0] = "ApplicableToAll";
    FeeComponentTypeEnum[FeeComponentTypeEnum["Individual"] = 1] = "Individual";
    FeeComponentTypeEnum[FeeComponentTypeEnum["Deduction"] = 2] = "Deduction";
    FeeComponentTypeEnum[FeeComponentTypeEnum["SpecialFee"] = 3] = "SpecialFee";
})(FeeComponentTypeEnum = exports.FeeComponentTypeEnum || (exports.FeeComponentTypeEnum = {}));
class FeeComponent {
}
exports.FeeComponent = FeeComponent;
//# sourceMappingURL=student-fee-management.model.js.map