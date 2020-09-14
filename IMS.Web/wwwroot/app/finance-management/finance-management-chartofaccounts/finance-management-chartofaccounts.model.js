"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChartOfAccountTypeEnum;
(function (ChartOfAccountTypeEnum) {
    ChartOfAccountTypeEnum[ChartOfAccountTypeEnum["Assets"] = 0] = "Assets";
    ChartOfAccountTypeEnum[ChartOfAccountTypeEnum["Liabilities"] = 1] = "Liabilities";
    ChartOfAccountTypeEnum[ChartOfAccountTypeEnum["Income"] = 2] = "Income";
    ChartOfAccountTypeEnum[ChartOfAccountTypeEnum["Expense"] = 3] = "Expense";
})(ChartOfAccountTypeEnum = exports.ChartOfAccountTypeEnum || (exports.ChartOfAccountTypeEnum = {}));
class ChartOfAccounts {
    constructor() {
        this.childChartOfAccounts = [];
        this.isValid = true;
        this.validationMessage = '';
    }
}
exports.ChartOfAccounts = ChartOfAccounts;
class ChartOfAccountsListViewAC {
    constructor() {
        this.parentChartOfAccounts = [];
    }
}
exports.ChartOfAccountsListViewAC = ChartOfAccountsListViewAC;
class AddEditChartOfAccountsAC {
}
exports.AddEditChartOfAccountsAC = AddEditChartOfAccountsAC;
//# sourceMappingURL=finance-management-chartofaccounts.model.js.map