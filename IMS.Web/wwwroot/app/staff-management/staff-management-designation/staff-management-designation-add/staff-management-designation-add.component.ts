import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StaffDesignationManagementService } from '../staff-management-designation.service';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';

@Component({
    moduleId: module.id,
    templateUrl: 'staff-management-designation-add.html'
})
export class AddDesignationManagementComponent implements OnInit {

    designationName: string = null;
    designationCode: string = null;
    designationDescription: string = null;
    errorMessage: string = '';

    constructor(private staffDesignationManagementService: StaffDesignationManagementService,
        private loaderService: LoaderService,
        private router: Router,
        private snackBar: SnackbarService) { }

    ngOnInit() { }

    addDesignation() {
        this.loaderService.toggleLoader(true);
        this.staffDesignationManagementService.addDesignation({ DesignationName: this.designationName, Code: this.designationCode, Description: this.designationDescription })
            .then(res => {
                let response = res.json();

                if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                    this.snackBar.showSnackbar(response.message);
                    this.router.navigate(['staff', 'designation', 'list']);
                }
                else {
                    this.errorMessage = response.message;
                }

                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
                console.log(err.json());
            });
    }

    checkWhiteSpace(designationNameModel: any, designationCodeModel: any) {
        designationNameModel.whiteSpaceError = '';
        designationCodeModel.whiteSpaceError = '';
        if (this.designationName !== null && this.designationName !== undefined && this.designationName.trim() === '') {
            designationNameModel.whiteSpaceError = 'Designation Name can\'t be empty';
        }
        if (this.designationCode !== null && this.designationCode !== undefined && this.designationCode.trim() === '') {
            designationCodeModel.whiteSpaceError = 'Designation Code can\'t be empty';
        }
    }

    resetError(designationNameModel: any, designationCodeModel: any) {
        if (this.designationName === null || this.designationName === undefined || this.designationName.trim() !== '') {
            designationNameModel.whiteSpaceError = '';
        }
        if (this.designationCode === null || this.designationCode === undefined || this.designationCode.trim() !== '') {
            designationCodeModel.whiteSpaceError = '';
        }
        this.errorMessage = '';
    }
}
