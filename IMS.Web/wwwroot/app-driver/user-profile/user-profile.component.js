"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const user_profile_service_1 = require("./user-profile.service");
const loader_service_1 = require("../../shared/loader-service");
const snackbar_service_1 = require("../../shared/snackbar-service");
const shared_service_1 = require("../../shared/shared.service");
const user_profile_model_1 = require("./user-profile.model");
let UserProfileComponent = class UserProfileComponent {
    constructor(userProfileService, loaderService, snackbarService, sharedService) {
        this.userProfileService = userProfileService;
        this.loaderService = loaderService;
        this.snackbarService = snackbarService;
        this.sharedService = sharedService;
        this.loggedInUserProfile = new user_profile_model_1.UserProfile();
        this.isEditEnabled = false;
        this.nameWhiteSpaceError = '';
    }
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
        });
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
};
UserProfileComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'user-profile.html'
    }),
    __metadata("design:paramtypes", [user_profile_service_1.UserProfileService,
        loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        shared_service_1.SharedService])
], UserProfileComponent);
exports.UserProfileComponent = UserProfileComponent;
//# sourceMappingURL=user-profile.component.js.map