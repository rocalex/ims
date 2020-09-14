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
const look_up_management_component_1 = require("./look-up-management.component");
const look_up_management_add_component_1 = require("./look-up-management-add/look-up-management-add.component");
const look_up_management_list_component_1 = require("./look-up-management-list/look-up-management-list.component");
const look_up_management_edit_detail_component_1 = require("./look-up-management-edit-detail/look-up-management-edit-detail.component");
const look_up_management_service_1 = require("./look-up-management.service");
let LookUpManagementModule = class LookUpManagementModule {
};
LookUpManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            look_up_management_component_1.LookUpManagementComponent,
            look_up_management_add_component_1.AddLookUpManagementComponent,
            look_up_management_list_component_1.ListLookUpManagementComponent,
            look_up_management_edit_detail_component_1.EditAndDetailLookUpManagementComponent
        ],
        providers: [
            look_up_management_service_1.LookUpManagementService
        ],
    })
], LookUpManagementModule);
exports.LookUpManagementModule = LookUpManagementModule;
//# sourceMappingURL=look-up-management.module.js.map