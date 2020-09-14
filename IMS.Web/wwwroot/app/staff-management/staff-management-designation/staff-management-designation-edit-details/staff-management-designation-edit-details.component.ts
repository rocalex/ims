import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StaffDesignationManagementService } from '../staff-management-designation.service';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';

@Component({
    moduleId: module.id,
    templateUrl: 'staff-management-designation-edit-details.html'
})
export class EditDetailsDesignationManagementComponent implements OnInit {

    errorMessage: string = '';
    designationId: number;
    designation: any = {};

    constructor(private staffDesignationManagementService: StaffDesignationManagementService,
        private loader: LoaderService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private snackBar: SnackbarService) {

        this.activatedRoute.params.subscribe(param => this.designationId = param.id);
    }

    ngOnInit() {
        this.getDesignation();
    }

    getDesignation() {
        this.loader.toggleLoader(true);

        this.staffDesignationManagementService.getDesignationDetail(this.designationId)
            .then(res => {
                this.designation = res.json();
                this.loader.toggleLoader(false);
            })
            .catch(err => {
                this.loader.toggleLoader(false);
                console.log(err.json());
            });
    }

    updateDesignation() {
        this.loader.toggleLoader(true);
        this.staffDesignationManagementService.updateDesignation(this.designation)
            .then(res => {
                let response = res.json();

                if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                    this.snackBar.showSnackbar(response.message);
                    this.router.navigate(['staff', 'designation', 'list']);
                }
                else {
                    this.errorMessage = response.message;
                }

                this.loader.toggleLoader(false);
            })
            .catch(err => {
                this.loader.toggleLoader(false);
                console.log(err.json());
            });
    }

    checkWhiteSpace(designationNameModel: any, designationCodeModel: any) {
        designationNameModel.whiteSpaceError = '';
        designationCodeModel.whiteSpaceError = '';
        if (this.designation.designationName !== null && this.designation.designationName !== undefined && this.designation.designationName.trim() === '') {
            designationNameModel.whiteSpaceError = 'Designation Name can\'t be empty';
        }
        if (this.designation.code !== null && this.designation.code !== undefined && this.designation.code.trim() === '') {
            designationCodeModel.whiteSpaceError = 'Designation Code can\'t be empty';
        }
    }

    resetError(designationNameModel: any, designationCodeModel: any) {
        if (this.designation.designationName === null || this.designation.designationName === undefined || this.designation.designationName.trim() !== '') {
            designationNameModel.whiteSpaceError = '';
        }
        if (this.designation.designationCode === null || this.designation.designationCode === undefined || this.designation.designationCode.trim() !== '') {
            designationCodeModel.whiteSpaceError = '';
        }
        this.errorMessage = '';
    }
}
