import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StaffDepartmentManagementService } from '../staff-management-department.service';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';

@Component({
    moduleId: module.id,
    templateUrl: 'staff-management-department-add.html'
})
export class AddDepartmentManagementComponent implements OnInit {

    departmentName: string = null;
    departmentCode: string = null;
    departmentDescription: string = null;
    errorMessage: string = '';

    constructor(private staffDepartmentManagementService: StaffDepartmentManagementService,
        private loaderService: LoaderService,
        private router: Router,
        private snackBar: SnackbarService) { }

    ngOnInit() { }

    addDepartment() {
        this.loaderService.toggleLoader(true);
        this.staffDepartmentManagementService.addDepartment({ DepartmentName: this.departmentName, Code: this.departmentCode, Description: this.departmentDescription })
            .then(res => {
                let response = res.json();

                if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                    this.snackBar.showSnackbar(response.message);
                    this.router.navigate(['staff', 'department', 'list']);
                }
                else {
                    this.errorMessage = response.message
                }

                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
                console.log(err.json());
            });
    }

    checkWhiteSpace(departmentNameModel: any, departmentCodeModel: any) {
        departmentNameModel.whiteSpaceError = '';
        departmentCodeModel.whiteSpaceError = '';
        if (this.departmentName !== null && this.departmentName !== undefined && this.departmentName.trim() === '') {
            departmentNameModel.whiteSpaceError = 'Department Name can\'t be null or empty';
        }
        if (this.departmentCode !== null && this.departmentCode !== undefined && this.departmentCode.trim() === '') {
            departmentCodeModel.whiteSpaceError = 'Department Code can\'t be null or empty';
        }
    }

    resetError(departmentNameModel: any, departmentCodeModel: any) {
        departmentNameModel.whiteSpaceError = '';
        this.errorMessage = '';
    }
}
