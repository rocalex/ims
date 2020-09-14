"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../shared/shared.module");
const administration_routes_1 = require("./administration.routes");
const administration_component_1 = require("./administration.component");
const administration_email_configuration_module_1 = require("./administration-email-configuration/administration-email-configuration.module");
//import { LookUpManagementModule } from './look-up-management/look-up-management.module';
const template_management_module_1 = require("./template-management/template-management.module");
const auto_sequence_module_1 = require("./auto-sequence/auto-sequence.module");
const event_management_module_1 = require("./event-management/event-management.module");
let AdministrationManagementModule = class AdministrationManagementModule {
};
AdministrationManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            administration_routes_1.AdministrationManagementRouting,
            administration_email_configuration_module_1.EmailConfigurationManagementModule,
            //LookUpManagementModule,
            template_management_module_1.TemplateManagementModule,
            auto_sequence_module_1.AutoSequenceManagementModule,
            event_management_module_1.EventManagementModule
        ],
        declarations: [
            administration_component_1.AdministrationManagementComponent
        ],
        providers: [],
    })
], AdministrationManagementModule);
exports.AdministrationManagementModule = AdministrationManagementModule;
//# sourceMappingURL=administration.module.js.map