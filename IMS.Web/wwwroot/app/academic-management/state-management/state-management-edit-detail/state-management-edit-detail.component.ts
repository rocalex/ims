import { Component, OnInit } from '@angular/core';
import { StateManagementService } from '../state-management.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../academic-management.model';

@Component({
    moduleId: module.id,
    templateUrl: 'state-management-edit-detail.html'
})
export class EditAndDetailStateManagementComponent implements OnInit {
    stateId: number;
    countries: any[] = [];
    baseModel: BaseModelLookUp = new BaseModelLookUp();
    error: LookUpResponse = new LookUpResponse();
    selectedUrl: string = '';
    selectedCountry: any = {};
    constructor(private stateManagementService: StateManagementService, private router: Router, private snackBar: SnackbarService,
        private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.selectedUrl = location.pathname.split('/')[2];
        this.loaderService.toggleLoader(true);
        var path = location.pathname.split('/');
        this.stateId = +(path[3]);
        this.getStateDetails();
    }

    getStateDetails() {
        this.stateManagementService.getStateDetails(this.stateId).then(res => {
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
                this.getAllCountries(response.country.id);
            }
        })
    }

    getAllCountries(countryId: number) {
        this.stateManagementService.getAllCountries().then(res => {
            this.countries = res.json();
            this.selectedCountry = this.countries.find(x => x.id === countryId);
            this.loaderService.toggleLoader(false);
        });
    }

    updaInstituteState(updateState: any) {
        this.loaderService.toggleLoader(true);
        var updateData = {
            Name: updateState.lookUp.Name, Code: updateState.lookUp.Code, CountryId: updateState.country.id,
            Description: updateState.lookUp.Description, Status: updateState.lookUp.Status, StateId: this.stateId
        }
        this.stateManagementService.updaInstituteState(updateData).then(res => {
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
        })
    }
}
