import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmailConfigurationManagementService } from '../administration-email-configuration.service';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';

import { EmailConfiguration } from '../administration-email-configuration.model';

@Component({
    moduleId: module.id,
    templateUrl: 'administration-email-configuration-add.html'
})
export class AddDepartmentManagementComponent implements OnInit {

    emailConfiguration: EmailConfiguration = new EmailConfiguration();;
    errorMessage: string = '';

    constructor(private emailConfigurationManagementService: EmailConfigurationManagementService,
        private loaderService: LoaderService,
        private router: Router,
        private snackBar: SnackbarService) { }

    ngOnInit() { }

    addEmailConfiguration() {
        this.loaderService.toggleLoader(true);
        this.emailConfigurationManagementService.addEmailConfiguration(this.emailConfiguration)
            .then(res => {
                let response = res.json();

                this.snackBar.showSnackbar(response.message);
                if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                    this.router.navigate(['administration', 'emailconfiguration', 'list']);
                }

                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
                console.log(err.json());
            });
    }

    checkWhiteSpace(nameModel: any, hostNameModel: any) {
        nameModel.whiteSpaceError = '';
        hostNameModel.whiteSpaceError = '';

        if (this.emailConfiguration.name !== null && this.emailConfiguration.name !== undefined && this.emailConfiguration.name.trim() === '') {
            nameModel.whiteSpaceError = 'Configuration name can\'t be null or empty';
        }
        if (this.emailConfiguration.hostName !== null && this.emailConfiguration.hostName !== undefined && this.emailConfiguration.hostName.trim() === '') {
            hostNameModel.whiteSpaceError = 'Host name can\'t be null or empty';
        }
    }

    resetError(nameModel: any, hostNameModel: any) {
        if (this.emailConfiguration.name !== null && this.emailConfiguration.name !== undefined && this.emailConfiguration.name.trim() !== '') {
            nameModel.whiteSpaceError = '';
        }
        if (this.emailConfiguration.hostName !== null && this.emailConfiguration.hostName !== undefined && this.emailConfiguration.hostName.trim() !== '') {
            hostNameModel.whiteSpaceError = '';
        }
        this.errorMessage = '';
    }
}
