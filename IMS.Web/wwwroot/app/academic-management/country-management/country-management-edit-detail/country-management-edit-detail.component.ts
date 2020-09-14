import { Component, OnInit } from '@angular/core';
import { CountryManagementService } from '../country-management.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../academic-management.model';

@Component({
  moduleId: module.id,
  templateUrl: 'country-management-edit-detail.html'
})
export class EditAndDetailCountryManagementComponent implements OnInit {
  countryId: number;
  baseModel: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  selectedUrl: string = '';
  constructor(private countryManagementService: CountryManagementService, private router: Router, private snackBar: SnackbarService,
    private loaderService: LoaderService) {
  }

  ngOnInit() {
    var path = location.pathname.split('/');
    this.countryId = +(path[3]);
    this.selectedUrl = path[2];
    this.getCountryDetails();
  }

  getCountryDetails() {
    this.loaderService.toggleLoader(true);
    this.countryManagementService.getCountryDetails(this.countryId).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['academic', 'country', 'list']);
      } else {
        this.baseModel.Code = response.code;
        this.baseModel.Name = response.name;
        this.baseModel.Description = response.description;
        this.baseModel.Status = response.status;
      }
      this.loaderService.toggleLoader(false);
    });
  }

  updateInstituteCountry(updateCountry: any) {
    this.loaderService.toggleLoader(true);
    var updateData = {
      Name: updateCountry.lookUp.Name, Code: updateCountry.lookUp.Code, CountryId: this.countryId,
      Description: updateCountry.lookUp.Description, Status: updateCountry.lookUp.Status
    }
    this.countryManagementService.updaInstituteCountry(updateData).then(res => {
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
    })
  }
}
