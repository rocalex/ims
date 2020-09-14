export enum ChartOfAccountTypeEnum {
    Assets,
    Liabilities,
    Income,
    Expense
}

export class ChartOfAccounts {
    constructor() {
        this.childChartOfAccounts = [];
        this.isValid = true;
        this.validationMessage = '';
    }

    id: number;
    code: string;
    name: string;
    aliasName: string;
    parentChartOfAccount: ChartOfAccounts;
    parentGroupId: number;
    isActive: boolean;
    isParent: boolean;
    accountType: ChartOfAccountTypeEnum;
    accountTypeName: string;
    description: string;
    childChartOfAccounts: ChartOfAccounts[];
    isNewEntry: boolean;
    isChartOfAccountCodeEditable: boolean;
    isUpdateEnabled: boolean;
    isValid: boolean;
    validationMessage: string;
}

export class ChartOfAccountsListViewAC {
    constructor() {
        this.parentChartOfAccounts = [];
    }

    chartOfAccountTypeEnum: ChartOfAccountTypeEnum;
    chartOfAccountTypeEnumString: string;
    parentChartOfAccounts: ChartOfAccounts[];
}

export class AddEditChartOfAccountsAC {
    addedChartOfAccountsList: ChartOfAccounts[];
    updatedChartOfAccountsList: ChartOfAccounts[];
}