import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../../shared/loader-service';
import { FinanceManagementPaymentsService } from '../finance-management-payments.service';

import { FinancePaymentAc, FinancePaymentReferenceEnum } from '../finance-management-payments.model';
import { PermissionService } from '../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';

@Component({
    moduleId: module.id,
    templateUrl: 'finance-management-payments-list.html'
})
export class ListFinanceManagementPaymentsComponent implements OnInit {

    paymentsList: FinancePaymentAc[] = [];
    paymentReferenceEnumDetails: any[] = [
        { key: FinancePaymentReferenceEnum.Accident, value: 'Accident' },
        { key: FinancePaymentReferenceEnum.Breakdown, value: 'Breakdown' },
        { key: FinancePaymentReferenceEnum.Maintenance, value: 'Maintenance' },
        { key: FinancePaymentReferenceEnum.PurchaseIndent, value: 'Purchase Indent' },
        { key: FinancePaymentReferenceEnum.Repair, value: 'Repair' }
    ];

  constructor(private loaderService: LoaderService, private permissionService: PermissionService,
        private financeManagementPaymentsService: FinanceManagementPaymentsService) { }

    ngOnInit() {
        this.getFinancePaymentsList();
    }

    getFinancePaymentsList() {
        this.loaderService.toggleLoader(true);
        this.financeManagementPaymentsService.getAllFinancePayments()
            .then(res => {
                this.paymentsList = res.json();
                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicPayment, type);
  }
}
