import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Models
import { ChangePassword } from './change-password.model';

// Service
import { ChangePasswordService } from './change-password.service';
import { SnackbarService } from '../../shared/snackbar-service';
import { LoaderService } from '../../shared/loader-service';

@Component({
    moduleId: module.id,
    templateUrl: 'change-password.html'
})
export class ChangePasswordComponent implements OnInit {

    changePasswordForm: FormGroup;
    oldPassword: FormControl;
    newPassword: FormControl;
    confirmPassword: FormControl;

    isPasswordMatch: boolean = true;
    changePasswordModel: ChangePassword = new ChangePassword();
    errorMessage: string = '';

    constructor(private snackBar: SnackbarService,
        private changePasswordService: ChangePasswordService,
        private loader: LoaderService) { }

    ngOnInit() {
        // Set form
        this.oldPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
        this.newPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
        this.confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);

        this.changePasswordForm = new FormGroup({
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
}
