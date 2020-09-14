"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_1 = require("@angular/platform-browser");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/http");
const animations_1 = require("@angular/platform-browser/animations");
const app_superadmin_component_1 = require("./app-superadmin.component");
const shared_module_1 = require("../shared/shared.module");
const institute_management_module_1 = require("./institute-management/institute-management.module");
const app_superadmin_routes_1 = require("./app-superadmin.routes");
const http_service_1 = require("../core/http.service");
const resource_file_module_1 = require("./resource-file/resource-file.module");
let SuperAdminAppModule = class SuperAdminAppModule {
};
SuperAdminAppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_superadmin_component_1.SuperAdminAppComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            animations_1.BrowserAnimationsModule,
            shared_module_1.SharedModule,
            institute_management_module_1.InstituteManagementModule,
            app_superadmin_routes_1.SuperAdminAppRouting,
            resource_file_module_1.ResourceFileManagementModule
        ],
        providers: [http_service_1.HttpService],
        bootstrap: [app_superadmin_component_1.SuperAdminAppComponent]
    })
], SuperAdminAppModule);
exports.SuperAdminAppModule = SuperAdminAppModule;
//# sourceMappingURL=app-superadmin.module.js.map