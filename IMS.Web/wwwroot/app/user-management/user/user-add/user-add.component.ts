import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Import services
import { UserService } from '../user.service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { LoaderService } from '../../../../shared/loader-service';

// Import models
import { AddUser } from '../user.model';

@Component({
    moduleId: module.id,
    templateUrl: 'user-add.html'
})
export class UserAddComponent implements OnInit {

    isPasswordMatch: boolean = true;
    user: AddUser = new AddUser();
    institutesList: any[] = [];
    allUserGroupsList: any[] = [];
    userGroupsList: any[] = [];
    
    // Validations
    userNameWhiteSpaceError: string = '';
    errorMessage: string = '';

    constructor(private userService: UserService,
        private snackBar: SnackbarService,
        private router: Router,
        private loader: LoaderService) { }

    ngOnInit() {
        this.getInstitutesAndUserGroupsList();
    }

    // Method for fetching the list of all institutes and roles
    getInstitutesAndUserGroupsList() {
        this.loader.toggleLoader(true);
        this.userService.getInstitutesAndUserGroupsList()
            .then((res) => {
                let response = res.json();

                this.institutesList = response.institutes;
                this.allUserGroupsList = response.userGroups;

                if (this.institutesList.length === 1) {
                    this.user.instituteId = this.institutesList[0].id;
                    this.getGroupsForSelectedInstitute();
                }

                this.loader.toggleLoader(false);
            })
            .catch((err) => {
                console.log(err.json());
                this.loader.toggleLoader(false);
            });
    }

    // Method for fetching the roles of the selected institute
    getGroupsForSelectedInstitute() {
        this.userGroupsList = this.allUserGroupsList.filter(x => x.instituteId == this.user.instituteId);
    }

    // Method for adding new user
    addUser() {
        this.isPasswordMatch = (this.user.password == this.user.confirmPassword);

        if (this.user.instituteId === 0) {
            this.snackBar.showSnackbar('Please select an institute');
        }
        else if (this.user.userGroupIdList.length === 0) {
            this.snackBar.showSnackbar('Please select a user group');
        }
        else if (this.isPasswordMatch) {
            this.loader.toggleLoader(true);
            this.userService.addUser(this.user)
                .then((res) => {
                    let response = res.json();

                    if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                        this.snackBar.showSnackbar(response.message);
                        this.router.navigate(['usermanagement', 'user', 'list']);
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
        else {
            this.snackBar.showSnackbar('Password and Confirm Password does not match');
        }
    }

    // Method for resetting validations
    resetError() {
        if (this.user.name !== null && this.user.name !== undefined) {
            this.userNameWhiteSpaceError = '';
        }
        this.errorMessage = '';
    }

    // Method for checking white space validation
    checkWhiteSpace() {
        this.userNameWhiteSpaceError = '';

        if (this.user.name !== null && this.user.name !== undefined && this.user.name.trim() === '') {
            this.userNameWhiteSpaceError = 'User name can\'t be empty';
        }
    }
}
