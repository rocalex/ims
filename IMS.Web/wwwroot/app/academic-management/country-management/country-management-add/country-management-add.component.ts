import { Component, OnInit } from '@angular/core';
import { CountryManagementService } from '../country-management.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../academic-management.model';

@Component({
  moduleId: module.id,
  templateUrl: 'country-management-add.html'
})
export class AddCountryManagementComponent implements OnInit {
  baseModel: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  selectedUrl: string = '';
  constructor(private countryManagementService: CountryManagementService, private router: Router, private snackBar: SnackbarService,
    private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.selectedUrl = location.pathname.split('/')[2];
  }

  addInstituteCountry(addCountry: any) {
    this.loaderService.toggleLoader(true);
    this.countryManagementService.addInstituteCountry(addCountry.lookUp).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['academic', 'country', 'list']);
        this.snackBar.showSnackbar(response.message);
      } else {
        this.error = new LookUpResponse();
        this.error.ErrorType = response.errorType;
        this.error.HasError = response.hasError;
        this.error.Message = response.message;
      }
      this.loaderService.toggleLoader(false);
    });
  }
}
