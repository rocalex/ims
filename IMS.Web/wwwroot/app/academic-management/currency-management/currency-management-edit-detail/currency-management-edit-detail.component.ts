import { Component, OnInit } from '@angular/core';
import { CurrencyManagementService } from '../currency-management.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { LoaderService } from '../../../../shared/loader-service';
import { BaseModelLookUp, LookUpResponse } from '../../academic-management.model';

@Component({
  moduleId: module.id,
  templateUrl: 'currency-management-edit-detail.html'
})
export class EditAndDetailCurrencyManagementComponent implements OnInit {
  currencyId: number;
  baseModel: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  selectedUrl: string = '';
  constructor(private currencyManagementService: CurrencyManagementService, private router: Router, private snackBar: SnackbarService,
    private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.loaderService.toggleLoader(true);
    var path = location.pathname.split('/');
    this.currencyId = +(path[3]);
    this.selectedUrl = path[2];
    this.getCurrencyDetails();
  }

  getCurrencyDetails() {
    this.currencyManagementService.getCurrencyDetails(this.currencyId).then(res => {
      var response = res.json();
      if (response.message) {
        this.router.navigate(['academic', 'currency', 'list']);
        this.snackBar.showSnackbar(response.message);
      } else {
        this.baseModel.Code = response.symbol;
        this.baseModel.Name = response.currencyName;
        this.baseModel.Description = response.description;
        this.baseModel.Status = response.status;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  updaInstituteCurrency(updateCurrency: any) {
    this.loaderService.toggleLoader(true);
    var updateData = {
      Name: updateCurrency.lookUp.Name, Code: updateCurrency.lookUp.Code, CurrencyId: this.currencyId,
      Description: updateCurrency.lookUp.Description, Status: updateCurrency.lookUp.Status
    }
    this.currencyManagementService.updaInstituteCurrency(updateData).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['academic', 'currency', 'list']);
        this.snackBar.showSnackbar(response.message);
      } else {
        this.error = new LookUpResponse();
        this.error.ErrorType = response.errorType;
        this.error.HasError = response.hasError;
        this.error.Message = response.message;
      }
      this.loaderService.toggleLoader(false);
    })
  }
}
