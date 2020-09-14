import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../../shared/loader-service';
import { FinanceManagementReceiptService } from '../finance-management-receipt.service';

import { FinanceReceipts } from '../finance-management-receipt.model';
import { PermissionService } from '../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';

@Component({
    moduleId: module.id,
    templateUrl: 'finance-management-receipt-list.html'
})
export class ListFinanceManagementReceiptComponent implements OnInit {

    receiptsList: FinanceReceipts[] = [];

  constructor(private loaderService: LoaderService, private permissionService: PermissionService,
        private financeManagementReceiptService: FinanceManagementReceiptService) { }

    ngOnInit() {
        this.getFinanceReceiptsList();
    }

    getFinanceReceiptsList() {
        this.loaderService.toggleLoader(true);
        this.financeManagementReceiptService.getFinanceReceiptsList()
            .then(res => {
                this.receiptsList = res.json();
                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }
}
