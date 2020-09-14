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
const forms_1 = require("@angular/forms");
// Models
const change_password_model_1 = require("./change-password.model");
// Service
const change_password_service_1 = require("./change-password.service");
const snackbar_service_1 = require("../../shared/snackbar-service");
const loader_service_1 = require("../../shared/loader-service");
let ChangePasswordComponent = class ChangePasswordComponent {
    constructor(snackBar, changePasswordService, loader) {
        this.snackBar = snackBar;
        this.changePasswordService = changePasswordService;
        this.loader = loader;
        this.isPasswordMatch = true;
        this.changePasswordModel = new change_password_model_1.ChangePassword();
        this.errorMessage = '';
    }
    ngOnInit() {
        // Set form
        this.oldPassword = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]);
        this.newPassword = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]);
        this.confirmPassword = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]);
        this.changePasswordForm = new forms_1.FormGroup({
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
            confirmPassword: this.confirmPassword
        });
    }
    // Method for updating the password
    changePassword() {
        this.isPasswordMatch = (this.changePasswordModel.newPassword === this.changePasswordModel.confirmPassword);
        if (this.isPasswordMatch) {
            this.loader.toggleLoader(true);
            this.changePasswordService.changePassword(this.changePasswordModel)
                .then((res) => {
                let response = res.json();
                if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                    this.snackBar.showSnackbar(response.message);
                    this.clearForm();
                }
                else {
                    this.errorMessage = response.message;
                }
                this.loader.toggleLoader(false);
            })
                .catch((err) => {
                this.loader.toggleLoader(false);
            });
        }
    }
    // Method for resetting the wrong password error
    resetError() {
        this.errorMessage = '';
    }
    clearForm() {
        this.changePasswordForm.reset();
        this.changePasswordForm.clearValidators();
        for (let i in this.changePasswordForm.controls) {
            this.changePasswordForm.controls[i].setErrors(null);
        }
    }
};
ChangePasswordComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'change-password.html'
    }),
    __metadata("design:paramtypes", [snackbar_service_1.SnackbarService,
        change_password_service_1.ChangePasswordService,
        loader_service_1.LoaderService])
], ChangePasswordComponent);
exports.ChangePasswordComponent = ChangePasswordComponent;
//# sourceMappingURL=change-password.component.js.map