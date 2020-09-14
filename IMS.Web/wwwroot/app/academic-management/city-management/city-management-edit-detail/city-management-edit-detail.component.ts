import { Component, OnInit } from '@angular/core';
import { CityManagementService } from '../city-management.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../academic-management.model';

@Component({
  moduleId: module.id,
  templateUrl: 'city-management-edit-detail.html'
})
export class EditAndDetailCityManagementComponent implements OnInit {
  cityId: number;
  countries: any[] = [];
  selectedCountry: any = {};
  states: any[] = [];
  selectedState: any = {};
  baseModel: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  selectedUrl: string = '';
  constructor(private cityManagementService: CityManagementService, private router: Router, private snackBar: SnackbarService,
    private loaderService: LoaderService) {
  }

  ngOnInit() {
    var path = location.pathname.split('/');
    this.cityId = +(path[3]);
    this.selectedUrl = path[2];
    this.getCityDetails();
  }

  getCityDetails() {
    this.loaderService.toggleLoader(true);
    this.cityManagementService.getCityDetails(this.cityId).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['academic', 'state', 'list']);
        this.loaderService.toggleLoader(false);
      } else {
        this.baseModel.Code = response.code;
        this.baseModel.Name = response.name;
        this.baseModel.Description = response.description;
        this.baseModel.Status = response.status;
        this.getAllCountries(response.state.countryId, response.stateId);
      }
    });
  }

  getAllCountries(countryId: number, stateId: number) {
    this.cityManagementService.getAllCountries().then(res => {
      this.countries = res.json();
      this.selectedCountry = this.countries.find(x => x.id === countryId);
      var country = this.countries.find(x => x.id === this.selectedCountry.id);
      this.states = country.states;
      this.selectedState = this.states.find(x => x.id === stateId);
      this.loaderService.toggleLoader(false);
    });
  }

  getStates() {
    var country = this.countries.find(x => x.id === this.selectedCountry.id);
    this.states = country.states;
    this.selectedState = {};
  }

  updateInstituteCity(updateCity: any) {
    this.loaderService.toggleLoader(true);
    var updateData = {
      Name: updateCity.lookUp.Name, Code: updateCity.lookUp.Code, StateId: updateCity.state.id,
      Description: updateCity.lookUp.Description, Status: updateCity.lookUp.Status, CityId: this.cityId
    }
    this.cityManagementService.updaInstituteCity(updateData).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['academic', 'city', 'list']);
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
