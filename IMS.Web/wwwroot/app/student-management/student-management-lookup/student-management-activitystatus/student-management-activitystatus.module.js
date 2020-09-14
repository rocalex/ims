"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../../../shared/shared.module");
const student_management_activitystatus_component_1 = require("./student-management-activitystatus.component");
const student_management_activitystatus_list_component_1 = require("./student-management-activitystatus-list/student-management-activitystatus-list.component");
const student_management_activitystatus_add_component_1 = require("./student-management-activitystatus-add/student-management-activitystatus-add.component");
const student_management_activitystatus_edit_detail_component_1 = require("./student-management-activitystatus-edit-detail/student-management-activitystatus-edit-detail.component");
const student_management_activitystatus_service_1 = require("./student-management-activitystatus.service");
let ActivityStatusManagementModule = class ActivityStatusManagementModule {
};
ActivityStatusManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule
        ],
        declarations: [
            student_management_activitystatus_component_1.ActivityStatusManagementComponent,
            student_management_activitystatus_list_component_1.ListActivityStatusManagementComponent,
            student_management_activitystatus_add_component_1.AddActivityStatusManagementComponent,
            student_management_activitystatus_edit_detail_component_1.EditAndDetailActivityStatusManagementComponent
        ],
        providers: [
            student_management_activitystatus_service_1.ActivityStatusManagementService
        ],
    })
], ActivityStatusManagementModule);
exports.ActivityStatusManagementModule = ActivityStatusManagementModule;
//# sourceMappingURL=student-management-activitystatus.module.js.map