import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../shared/loader-service';
import { PermissionService } from '../../../shared/permission.service';
import { SnackbarService } from '../../../shared/snackbar-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';
import { PriceList, ItemPriceList, CurrencyModel } from './priceList.model';
import { PriceListService } from './priceList.service';

@Component({
  moduleId: module.id,
  templateUrl: './priceList.component.html'
})
export class PriceListComponent implements OnInit {

    addPriceList: PriceList = new PriceList();
    typeList: any[] = [
        {id: 0, name: "Sale"},
        {id: 1, name: "Purchase"}
    ];
    currencyList: CurrencyModel[] = [];
    rateTypeList: any[] = [
        {id: 0, name: "All Items"},
        {id: 1, name: "Item Wise"}
    ];
    customRateList: any[] = [
        {id: 0, name: "Up"},
        {id: 1, name: "Down"}
    ];
    calculationTypeList: any[] = [
        {id: 0, name: "Value"},
        {id: 1, name: "Percentage"}
    ]
  constructor(
    private loaderService: LoaderService,
    private permissionService: PermissionService,
    private apiService: PriceListService,
    private snackService: SnackbarService
    ) { }

  ngOnInit() {
    this.getCurrencyList();
  }

  init() {
  }

  getCurrencyList() {
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }
}
