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
const administration_email_configuration_service_1 = require("../administration-email-configuration.service");
const loader_service_1 = require("../../../../shared/loader-service");
const permission_service_1 = require("../../../../shared/permission.service");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
let ListEmailConfigurationManagementComponent = class ListEmailConfigurationManagementComponent {
    constructor(emailConfigurationManagementService, loaderService, permissionService) {
        this.emailConfigurationManagementService = emailConfigurationManagementService;
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.emailConfigurations = [];
    }
    ngOnInit() {
        this.getAllEmailConfigurations();
    }
    getAllEmailConfigurations() {
        this.loaderService.toggleLoader(true);
        this.emailConfigurationManagementService.getAllEmailConfigurations()
            .then((res) => {
            this.emailConfigurations = res.json();
            this.loaderService.toggleLoader(false);
        })
            .catch((err) => {
            console.log(err.json());
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Administration, sidenav_model_1.UserGroupFeatureChildEnum.AcademicEmail, type);
    }
};
ListEmailConfigurationManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'administration-email-configuration-list.html'
    }),
    __metadata("design:paramtypes", [administration_email_configuration_service_1.EmailConfigurationManagementService,
        loader_service_1.LoaderService, permission_service_1.PermissionService])
], ListEmailConfigurationManagementComponent);
exports.ListEmailConfigurationManagementComponent = ListEmailConfigurationManagementComponent;
//# sourceMappingURL=administration-email-configuration-list.component.js.map