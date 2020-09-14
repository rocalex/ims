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
const user_group_management_service_1 = require("../user-group-management.service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const loader_service_1 = require("../../../../shared/loader-service");
let UserGroupManagementEditDetailsComponent = class UserGroupManagementEditDetailsComponent {
    constructor(userGroupManagementService, router, activatedRoute, snackBar, loader) {
        this.userGroupManagementService = userGroupManagementService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.snackBar = snackBar;
        this.loader = loader;
        this.userGroup = {};
        this.errorMessage = '';
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
    checkWhiteSpace(userGroupCodeModel, userGroupNameModel) {
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
    resetError(formModel) {
        formModel.whiteSpaceError = '';
        this.errorMessage = '';
    }
};
UserGroupManagementEditDetailsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'user-group-management-edit-details.html'
    }),
    __metadata("design:paramtypes", [user_group_management_service_1.UserGroupManagementService,
        router_1.Router,
        router_1.ActivatedRoute,
        snackbar_service_1.SnackbarService,
        loader_service_1.LoaderService])
], UserGroupManagementEditDetailsComponent);
exports.UserGroupManagementEditDetailsComponent = UserGroupManagementEditDetailsComponent;
//# sourceMappingURL=user-group-management-edit-details.component.js.map