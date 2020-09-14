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
const resource_file_component_1 = require("./resource-file.component");
const resource_file_service_1 = require("./resource-file.service");
const ang_jsoneditor_1 = require("ang-jsoneditor");
let ResourceFileManagementModule = class ResourceFileManagementModule {
};
ResourceFileManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            ang_jsoneditor_1.NgJsonEditorModule
        ],
        declarations: [
            resource_file_component_1.ResourceFileManagementComponent
        ],
        providers: [
            resource_file_service_1.ResourceFileManagementService
        ],
    })
], ResourceFileManagementModule);
exports.ResourceFileManagementModule = ResourceFileManagementModule;
//# sourceMappingURL=resource-file.module.js.map