import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Import services
import { UserGroupManagementService } from '../user-group-management.service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { LoaderService } from '../../../../shared/loader-service';

// Import models
import { AddUserGroup } from '../user-group-management.model';

@Component({
    moduleId: module.id,
    templateUrl: 'user-group-management-add.html'
})
export class UserGroupManagementAddComponent implements OnInit {

    userGroup: AddUserGroup = new AddUserGroup();
    errorMessage: string = '';

    constructor(private userGroupManagementService: UserGroupManagementService,
        private snackBar: SnackbarService,
        private router: Router,
        private loader: LoaderService) { }

    ngOnInit() { }

    // Method for adding new user group
    addUserGroup() {
        this.loader.toggleLoader(true);
        this.userGroupManagementService.addUserGroup(this.userGroup)
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

        if (this.userGroup.code !== null && this.userGroup.code !== undefined && this.userGroup.code.trim() === '') {
            userGroupCodeModel.whiteSpaceError = 'User role code can\'t be empty';
        }
        if (this.userGroup.name !== null && this.userGroup.name !== undefined && this.userGroup.name.trim() === '') {
            userGroupNameModel.whiteSpaceError = 'User role name can\'t be empty';
        }
    }

    // Method for resetting errors
    resetError(formModel: any) {
        formModel.whiteSpaceError = '';
        this.errorMessage = '';
    }
}
