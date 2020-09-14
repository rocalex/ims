import { Component, OnInit } from '@angular/core';

import { UserProfileService } from './user-profile.service';
import { LoaderService } from '../../shared/loader-service';
import { SnackbarService } from '../../shared/snackbar-service';
import { SharedService } from '../../shared/shared.service';

import { UserProfile } from './user-profile.model';

@Component({
    moduleId: module.id,
    templateUrl: 'user-profile.html'
})
export class UserProfileComponent implements OnInit {

    loggedInUserProfile: UserProfile = new UserProfile();
    isEditEnabled: boolean = false;
    nameWhiteSpaceError: string = '';

    constructor(private userProfileService: UserProfileService,
        private loaderService: LoaderService,
        private snackbarService: SnackbarService,
        private sharedService: SharedService) { }

    ngOnInit() {
        this.nameWhiteSpaceError = '';
        this.isEditEnabled = false;
        this.getLoggedInUserProfileDetails();
    }

    getLoggedInUserProfileDetails() {
        this.loaderService.toggleLoader(true);
        this.userProfileService.getLoggedInUserProfileDetails()
            .then(res => {
                this.loggedInUserProfile = res.json();
                this.sharedService.setCurrentUserName(this.loggedInUserProfile.name);
                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                console.log(err.json());
                this.loaderService.toggleLoader(false);
            })
    }

    checkWhiteSpace() {
        this.nameWhiteSpaceError = '';
        if (this.loggedInUserProfile.name.trim() === '') {
            this.nameWhiteSpaceError = 'Name can\'t be empty';
        }
    }

    resetError() {
        this.nameWhiteSpaceError = '';
    }

    enableEditProfile() {
        this.isEditEnabled = true;
    }

    cancelEditing() {
        this.ngOnInit();
    }

    updateProfileDetails() {
        this.loaderService.toggleLoader(true);
        this.userProfileService.updateLoggedInUserProfileDetails(this.loggedInUserProfile)
            .then(res => {
                let response = res.json();

                if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                    this.snackbarService.showSnackbar(response.message);
                }

                this.loaderService.toggleLoader(false);
                this.ngOnInit();
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
                this.getLoggedInUserProfileDetails();
            });
    }
}
