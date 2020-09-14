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
const router_1 = require("@angular/router");
// Import services
const user_service_1 = require("../user.service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const loader_service_1 = require("../../../../shared/loader-service");
// Import models
const user_model_1 = require("../user.model");
let UserEditDetailsComponent = class UserEditDetailsComponent {
    constructor(userService, snackBar, router, activatedRoute, loader) {
        this.userService = userService;
        this.snackBar = snackBar;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.loader = loader;
        this.isPasswordMatch = false;
        this.user = new user_model_1.AddUser();
        this.institutesList = [];
        this.allUserGroupsList = [];
        this.userGroupsList = [];
        // Validations
        this.userNameWhiteSpaceError = '';
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
};
UserEditDetailsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'user-edit-details.html'
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        snackbar_service_1.SnackbarService,
        router_1.Router,
        router_1.ActivatedRoute,
        loader_service_1.LoaderService])
], UserEditDetailsComponent);
exports.UserEditDetailsComponent = UserEditDetailsComponent;
//# sourceMappingURL=user-edit-details.component.js.map