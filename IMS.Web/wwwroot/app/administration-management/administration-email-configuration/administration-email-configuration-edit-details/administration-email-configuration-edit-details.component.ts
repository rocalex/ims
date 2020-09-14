import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EmailConfigurationManagementService } from '../administration-email-configuration.service';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';

import { EmailConfiguration } from '../administration-email-configuration.model';

@Component({
    moduleId: module.id,
    templateUrl: 'administration-email-configuration-edit-details.html'
})
export class EditDetailsDepartmentManagementComponent implements OnInit {

    emailConfigurationId: number;
    emailConfiguration: EmailConfiguration = new EmailConfiguration();;
    errorMessage: string = '';

    constructor(private emailConfigurationManagementService: EmailConfigurationManagementService,
        private loaderService: LoaderService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private snackBar: SnackbarService) {

        this.activatedRoute.params.subscribe(param => this.emailConfigurationId = param.id);
    }

    ngOnInit() {
        this.getEmailConfiguration();
    }

    getEmailConfiguration() {
        this.loaderService.toggleLoader(true);
        this.emailConfigurationManagementService.getEmailConfigurationDetail(this.emailConfigurationId)
            .then(res => {
                this.emailConfiguration = res.json();
                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
                console.log(err.json);
            });
    }

    updateEmailConfiguration() {
        this.loaderService.toggleLoader(true);
        this.emailConfigurationManagementService.updateEmailConfiguration(this.emailConfiguration)
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
