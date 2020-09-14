import { Component, OnInit } from '@angular/core';
import { AddLookUpManagementAc, LookUpManagementResponse, LookUpManagementResponseType } from '../look-up-management.model';
import { LookUpManagementService } from '../look-up-management.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';

@Component({
    moduleId: module.id,
    templateUrl: 'look-up-management-add.html'
})
export class AddLookUpManagementComponent implements OnInit {
    addLookUp: AddLookUpManagementAc = new AddLookUpManagementAc();
    error: LookUpManagementResponse = new LookUpManagementResponse();
    selectedLookUp: any = {};
    lookUps: any[] = [];
    constructor(private lookUpManagementService: LookUpManagementService, private loaderService: LoaderService,
        private router: Router, private snackBar: SnackbarService) {
    }

    ngOnInit() {
        this.getAllLookUps();
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

    getAllLookUps() {
        this.loaderService.toggleLoader(true);
        this.lookUpManagementService.getAllLookUps().then(res => {
            this.lookUps = res.json();
            this.loaderService.toggleLoader(false);
        })
    }

    addLookUpMapping() {
        this.loaderService.toggleLoader(true);
        this.addLookUp.LookUpId = this.selectedLookUp.id;
        this.lookUpManagementService.addLookUpMapping(this.addLookUp).then(res => {
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
