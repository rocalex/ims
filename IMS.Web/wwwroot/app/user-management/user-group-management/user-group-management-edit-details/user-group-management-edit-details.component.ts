import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, LoadChildren } from '@angular/router';

// Import services
import { UserGroupManagementService } from '../user-group-management.service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { LoaderService } from '../../../../shared/loader-service';

// Import models
import { AddUserGroup } from '../user-group-management.model';

@Component({
    moduleId: module.id,
    templateUrl: 'user-group-management-edit-details.html'
})
export class UserGroupManagementEditDetailsComponent implements OnInit {

    userGroupId: number;
    userGroup: any = {};
    errorMessage: string = '';

    constructor(private userGroupManagementService: UserGroupManagementService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private snackBar: SnackbarService,
        private loader: LoaderService) {

        this.activatedRoute.params.subscribe(param => this.userGroupId = param.id);
    }

    ngOnInit() {
        this.getUserGroupDetails();
    }

    // Method for fetching the details of the user group
    getUserGroupDetails() {
        this.loader.toggleLoader(true);
        this.userGroupManagementService.getUserGroupById(this.userGroupId)
            .then((res) => {
                this.userGroup = res.json();
                this.loader.toggleLoader(false);
            })
            .catch((err) => {
                console.log(err.json());
                this.loader.toggleLoader(false);
            });
    }

    // Method for updating user group details
    updateUserGroupDetails() {
        this.loader.toggleLoader(true);
        this.userGroupManagementService.updateUserGroup(this.userGroup)
            .then((res) => {
                let response = res.json();

                if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                    this.snackBar.showSnackbar(response.message);
                    this.router.navigate(['usermanagement', 'role', 'list']);
                }
                else {
                    this.errorMessage = response.message;
                }
                this.loader.toggleLoader(false);
            })
            .catch((err) => {
                console.log(err.json());
                this.loader.toggleLoader(false);
            });
    }

    // Method for checking white space validation
    checkWhiteSpace(userGroupCodeModel: any, userGroupNameModel: any) {
        userGroupCodeModel.whiteSpaceError = '';
        userGroupNameModel.whiteSpaceError = '';

        if (this.userGroup.code.trim() === '') {
            userGroupCodeModel.whiteSpaceError = 'User role code can\'t be empty';
        }
        if (this.userGroup.name.trim() === '') {
            userGroupNameModel.whiteSpaceError = 'User role name can\'t be empty';
        }
    }

    // Method for resetting errors
    resetError(formModel: any) {
        formModel.whiteSpaceError = '';
        this.errorMessage = '';
    }
}
