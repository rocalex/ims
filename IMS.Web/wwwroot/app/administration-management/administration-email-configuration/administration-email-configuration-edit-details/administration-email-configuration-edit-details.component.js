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
const administration_email_configuration_service_1 = require("../administration-email-configuration.service");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const administration_email_configuration_model_1 = require("../administration-email-configuration.model");
let EditDetailsDepartmentManagementComponent = class EditDetailsDepartmentManagementComponent {
    constructor(emailConfigurationManagementService, loaderService, router, activatedRoute, snackBar) {
        this.emailConfigurationManagementService = emailConfigurationManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.snackBar = snackBar;
        this.emailConfiguration = new administration_email_configuration_model_1.EmailConfiguration();
        this.errorMessage = '';
        this.activatedRoute.params.subscribe(param => this.emailConfigurationId = param.id);
    }
    ;
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
    checkWhiteSpace(nameModel, hostNameModel) {
        nameModel.whiteSpaceError = '';
        hostNameModel.whiteSpaceError = '';
        if (this.emailConfiguration.name !== null && this.emailConfiguration.name !== undefined && this.emailConfiguration.name.trim() === '') {
            nameModel.whiteSpaceError = 'Configuration name can\'t be null or empty';
        }
        if (this.emailConfiguration.hostName !== null && this.emailConfiguration.hostName !== undefined && this.emailConfiguration.hostName.trim() === '') {
            hostNameModel.whiteSpaceError = 'Host name can\'t be null or empty';
        }
    }
    resetError(nameModel, hostNameModel) {
        if (this.emailConfiguration.name !== null && this.emailConfiguration.name !== undefined && this.emailConfiguration.name.trim() !== '') {
            nameModel.whiteSpaceError = '';
        }
        if (this.emailConfiguration.hostName !== null && this.emailConfiguration.hostName !== undefined && this.emailConfiguration.hostName.trim() !== '') {
            hostNameModel.whiteSpaceError = '';
        }
        this.errorMessage = '';
    }
};
EditDetailsDepartmentManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'administration-email-configuration-edit-details.html'
    }),
    __metadata("design:paramtypes", [administration_email_configuration_service_1.EmailConfigurationManagementService,
        loader_service_1.LoaderService,
        router_1.Router,
        router_1.ActivatedRoute,
        snackbar_service_1.SnackbarService])
], EditDetailsDepartmentManagementComponent);
exports.EditDetailsDepartmentManagementComponent = EditDetailsDepartmentManagementComponent;
//# sourceMappingURL=administration-email-configuration-edit-details.component.js.map