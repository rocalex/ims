import { Component, OnInit } from '@angular/core';
import { StateManagementService } from '../state-management.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../academic-management.model';

@Component({
  moduleId: module.id,
  templateUrl: 'state-management-add.html'
})
export class AddStateManagementComponent implements OnInit {
  countries: any[] = [];
  baseModel: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  selectedUrl: string = '';
  constructor(private stateManagementService: StateManagementService, private router: Router, private snackBar: SnackbarService,
    private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.selectedUrl = location.pathname.split('/')[2];
    this.getAllCountries();
  }

  getAllCountries() {
    this.loaderService.toggleLoader(true);
    this.stateManagementService.getAllCountries().then(res => {
      this.countries = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  addInstituteState(addState: any) {
    this.loaderService.toggleLoader(true);
    addState.lookUp.countryId = addState.country.id;
    this.stateManagementService.addInstituteState(addState.lookUp).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['academic', 'state', 'list']);
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
