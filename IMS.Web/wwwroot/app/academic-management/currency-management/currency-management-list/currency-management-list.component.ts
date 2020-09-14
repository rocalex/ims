import { Component, OnInit } from '@angular/core';
import { CurrencyManagementService } from '../currency-management.service';
import { LoaderService } from '../../../../shared/loader-service';
import { PermissionService } from '../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';

@Component({
  moduleId: module.id,
  templateUrl: 'currency-management-list.html'
})
export class ListCurrencyManagementComponent implements OnInit {
  currencies: any[] = [];
  constructor(private currencyManagementService: CurrencyManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllCurrencies();
  }

  getAllCurrencies() {
    this.loaderService.toggleLoader(true);
    this.currencyManagementService.getAllCurrencies().then(res => {
      this.currencies = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Administration, UserGroupFeatureChildEnum.AcademicCurrency, type);
  }
}
