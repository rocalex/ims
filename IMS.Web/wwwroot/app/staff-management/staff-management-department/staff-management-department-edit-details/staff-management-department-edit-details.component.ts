import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StaffDepartmentManagementService } from '../staff-management-department.service';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';

@Component({
    moduleId: module.id,
    templateUrl: 'staff-management-department-edit-details.html'
})
export class EditDetailsDepartmentManagementComponent implements OnInit {

    errorMessage: string = '';
    departmentId: number;
    department: any = {};

    constructor(private staffDepartmentManagementService: StaffDepartmentManagementService,
        private loader: LoaderService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private snackBar: SnackbarService) {

        this.activatedRoute.params.subscribe(param => this.departmentId = param.id);
    }

    ngOnInit() {
        this.getDepartment();
    }

    getDepartment() {
        this.loader.toggleLoader(true);

        this.staffDepartmentManagementService.getDepartmentDetail(this.departmentId)
            .then(res => {
                this.department = res.json();
                this.loader.toggleLoader(false);
            })
            .catch(err => {
                this.loader.toggleLoader(false);
                console.log(err.json());
            });
    }

    updateDepartment() {
        this.loader.toggleLoader(true);
        this.staffDepartmentManagementService.updateDepartment(this.department)
            .then(res => {
                let response = res.json();

                if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                    this.snackBar.showSnackbar(response.message);
                    this.router.navigate(['staff', 'department', 'list']);
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

    checkWhiteSpace(departmentNameModel: any, departmentCodeModel: any) {
        departmentNameModel.whiteSpaceError = '';
        departmentCodeModel.whiteSpaceError = '';
        if (this.department.departmentName !== null && this.department.departmentName !== undefined && this.department.departmentName.trim() === '') {
            departmentNameModel.whiteSpaceError = 'Department Name can\'t be null or empty';
        }
        if (this.department.code !== null && this.department.code !== undefined && this.department.code.trim() === '') {
            departmentCodeModel.whiteSpaceError = 'Department Code can\'t be null or empty';
        }
    }

    resetError(departmentNameModel: any, departmentCodeModel: any) {        
        if (this.department.departmentName === null || this.department.departmentName === undefined || this.department.departmentName.trim() !== '') {
            departmentNameModel.whiteSpaceError = '';
        }
        if (this.department.code === null || this.department.code === undefined || this.department.code.trim() !== '') {
            departmentCodeModel.whiteSpaceError = '';
        }
        this.errorMessage = '';
    }
}
