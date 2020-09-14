import { Component, OnInit } from '@angular/core';
import { UpdateLookUpManagementAc, LookUpManagementResponse, LookUpManagementResponseType } from '../look-up-management.model';
import { LookUpManagementService } from '../look-up-management.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';

@Component({
    moduleId: module.id,
    templateUrl: 'look-up-management-edit-detail.html'
})
export class EditAndDetailLookUpManagementComponent implements OnInit {
    lookUpId: number;
    updateLookUp: UpdateLookUpManagementAc = new UpdateLookUpManagementAc();
    error: LookUpManagementResponse = new LookUpManagementResponse();
    selectedLookUp: any = {};
    lookUps: any[] = [];
    constructor(private lookUpManagementService: LookUpManagementService, private loaderService: LoaderService,
        private router: Router, private snackBar: SnackbarService) {
    }

    ngOnInit() {
        var path = location.pathname.split('/');
        this.lookUpId = +(path[3]);
        this.getLookUpMappingDetailById();
    }

    hasError(fieldName: string) {
        var id = LookUpManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        } else {
            return false;
        }
    }

    resetError(fieldName: string) {
        var id = LookUpManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new LookUpManagementResponse();
        }
    }

    getLookUpMappingDetailById() {
        this.loaderService.toggleLoader(true);
        this.lookUpManagementService.getLookUpMappingDetailById(this.lookUpId).then(res => {
            var response = res.json();
            if (response.message) {
                this.router.navigate(['administration', 'lookup', 'list']);
                this.snackBar.showSnackbar(response.message);
            } else {
                this.updateLookUp.Code = response.code;
                this.updateLookUp.Description = response.description;
                this.updateLookUp.IsDefault = response.isDefault;
                this.updateLookUp.IsDeleted = response.isDeleted;
                this.updateLookUp.IsSystemRow = response.isSystemRow;
                this.updateLookUp.LookUpId = response.lookUpId;
                this.updateLookUp.Name = response.name;
                this.updateLookUp.Status = response.status;
                this.getAllLookUps();
            }
            this.loaderService.toggleLoader(false);
        })
    }

    getAllLookUps() {
        this.loaderService.toggleLoader(true);
        this.lookUpManagementService.getAllLookUps().then(res => {
            this.lookUps = res.json();
            this.selectedLookUp = this.lookUps.find(x => x.id === this.updateLookUp.LookUpId);
            this.loaderService.toggleLoader(false);
        })
    }

    updateLookUpMapping() {
        this.loaderService.toggleLoader(true);
        this.updateLookUp.LookUpId = this.selectedLookUp.id;
        this.updateLookUp.Id = this.lookUpId;
        this.lookUpManagementService.updateLookUpMapping(this.updateLookUp).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['administration', 'lookup', 'list']);
                this.snackBar.showSnackbar(response.message);
            } else {
                this.error.ErrorType = response.errorType;
                this.error.HasError = response.hasError;
                this.error.Message = response.message;
            }
            this.loaderService.toggleLoader(false);
        })
    }
}
