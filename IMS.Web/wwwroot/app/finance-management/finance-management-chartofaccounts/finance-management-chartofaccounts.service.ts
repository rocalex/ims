import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

import { ChartOfAccounts, AddEditChartOfAccountsAC } from './finance-management-chartofaccounts.model';

@Injectable()
export class FinanceManagementChartOfAccountsService {

    FinanceManagementChartOfAccountsUrl = 'api/financemanagement/chartofaccounts';

    constructor(private http: HttpService) { }

    getChartOfAccountsList() {
        return this.http.get(this.FinanceManagementChartOfAccountsUrl);
    }

    getChartOfAccountById(chartOfAccountId: number) {
        return this.http.get(this.FinanceManagementChartOfAccountsUrl + '/' + chartOfAccountId);
    }

    addNewChartOfAccount(newChartOfAccount: ChartOfAccounts) {
        return this.http.post(this.FinanceManagementChartOfAccountsUrl, newChartOfAccount);
    }

    updateChartOfAccount(updatedChartOfAccount: ChartOfAccounts) {
        return this.http.put(this.FinanceManagementChartOfAccountsUrl, updatedChartOfAccount);
    }

    getAutoSequenceNumberByTypeAndInstituteId() {
        return this.http.get('api/autosequencegeneratormanagement/generator/Chart of Accounts Code');
    }

    getParentChartOfAccountsList() {
        return this.http.get(this.FinanceManagementChartOfAccountsUrl + '/parents');
    }

    bulkAddUpdateChartOfAccounts(addEditChartOfAccountsAc: AddEditChartOfAccountsAC) {
        return this.http.post(this.FinanceManagementChartOfAccountsUrl + '/bulkaddupdate', addEditChartOfAccountsAc);
    }
}
