import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../../shared/loader-service';
import { FinanceManagementPaymentTypesService } from '../finance-management-payment-types.service';

import { PaymentTypesAc } from '../finance-management-payment-types.model';
import { PermissionService } from '../../../../shared/permission.service';
import { UserGroupFeatureChildEnum, UserGroupFeatureParentEnum } from '../../../../shared/sidenav/sidenav.model';

@Component({
    moduleId: module.id,
    templateUrl: 'finance-management-payment-types-list.html'
})
export class ListFinanceManagementPaymentTypesComponent implements OnInit {

    paymentTypes: PaymentTypesAc[] = [];

  constructor(private loaderService: LoaderService, private permissionService: PermissionService,
        private financeManagementPaymentTypesService: FinanceManagementPaymentTypesService) { }

    ngOnInit() {
        this.getAllPaymentTypes();
    }

    getAllPaymentTypes() {
        this.loaderService.toggleLoader(true);
        this.financeManagementPaymentTypesService.getAllPaymentTypes()
            .then(res => {
                this.paymentTypes = res.json();
                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinancePaymentType, type);
  }
}
