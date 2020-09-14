import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Import services
import { UserService } from '../user.service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { LoaderService } from '../../../../shared/loader-service';

// Import models
import { AddUser } from '../user.model';

@Component({
    moduleId: module.id,
    templateUrl: 'user-edit-details.html'
})
export class UserEditDetailsComponent implements OnInit {

    isPasswordMatch: boolean = false;
    user: AddUser = new AddUser();
    userId: string;
    institutesList: any[] = [];
    allUserGroupsList: any[] = [];
    userGroupsList: any[] = [];

    // Validations
    userNameWhiteSpaceError: string = '';

    constructor(private userService: UserService,
        private snackBar: SnackbarService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private loader: LoaderService) {

        this.activatedRoute.params.subscribe(param => this.userId = param.id);
    }

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
                this.userGroupsList = this.allUserGroupsList;

                if (this.institutesList.length === 1) {
                    this.user.instituteId = this.institutesList[0].id;
                    this.getGroupsForSelectedInstitute();
                }

                this.loader.toggleLoader(false);

                // Fetch user details
                this.getUserDetails();
            })
            .catch((err) => {
                console.log(err.json());
                this.loader.toggleLoader(false);
            });
    }

    // Method for fetching the details of the user
    getUserDetails() {
        this.loader.toggleLoader(true);
        this.userService.getUserById(this.userId)
            .then((res) => {
                this.user = res.json();
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

    // Method for updating the details of the user
    updateUser() {
        this.loader.toggleLoader(true);
        this.userService.updateUser(this.user)
            .then((res) => {
                let response = res.json();

                this.snackBar.showSnackbar(response.message);
                if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                    this.router.navigate(['usermanagement', 'user', 'list']);
                }

                this.loader.toggleLoader(false);
            })
            .catch((err) => {
                console.log(err.json());
                this.loader.toggleLoader(false);
            });
    }

    // Method for resetting validations
    resetError() {
        if (this.user.name !== null && this.user.name !== undefined) {
            this.userNameWhiteSpaceError = '';
        }
    }

    // Method for checking white space validation
    checkWhiteSpace() {
        this.userNameWhiteSpaceError = '';

        if (this.user.name !== null && this.user.name !== undefined && this.user.name.trim() === '') {
            this.userNameWhiteSpaceError = 'User name can\'t be empty';
        }
    }
}
