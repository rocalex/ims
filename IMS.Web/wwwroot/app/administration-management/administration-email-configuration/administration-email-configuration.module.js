"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../../shared/shared.module");
const administration_email_configuration_component_1 = require("./administration-email-configuration.component");
const administration_email_configuration_list_component_1 = require("./administration-email-configuration-list/administration-email-configuration-list.component");
const administration_email_configuration_add_component_1 = require("./administration-email-configuration-add/administration-email-configuration-add.component");
const administration_email_configuration_edit_details_component_1 = require("./administration-email-configuration-edit-details/administration-email-configuration-edit-details.component");
const administration_email_configuration_service_1 = require("./administration-email-configuration.service");
let EmailConfigurationManagementModule = class EmailConfigurationManagementModule {
};
EmailConfigurationManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            administration_email_configuration_component_1.AdministrationEmailConfigurationManagementComponent,
            administration_email_configuration_list_component_1.ListEmailConfigurationManagementComponent,
            administration_email_configuration_add_component_1.AddDepartmentManagementComponent,
            administration_email_configuration_edit_details_component_1.EditDetailsDepartmentManagementComponent
        ],
        providers: [
            administration_email_configuration_service_1.EmailConfigurationManagementService
        ],
    })
], EmailConfigurationManagementModule);
exports.EmailConfigurationManagementModule = EmailConfigurationManagementModule;
//# sourceMappingURL=administration-email-configuration.module.js.map