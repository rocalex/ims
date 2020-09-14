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
const staff_management_activities_routes_1 = require("./staff-management-activities.routes");
const staff_management_activities_component_1 = require("./staff-management-activities.component");
const staff_management_activity_module_1 = require("./staff-management-activity/staff-management-activity.module");
const staff_management_homework_module_1 = require("./staff-management-homework/staff-management-homework.module");
const staff_management_disciplinary_module_1 = require("./staff-management-disciplinary/staff-management-disciplinary.module");
const staff_management_notice_module_1 = require("./staff-management-notice/staff-management-notice.module");
let StaffManagementActivitiesModule = class StaffManagementActivitiesModule {
};
StaffManagementActivitiesModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            staff_management_activities_routes_1.StaffManagementActivitiesRouting,
            staff_management_activity_module_1.StaffActivityManagementModule,
            staff_management_homework_module_1.StaffManagementHomeworkModule,
            staff_management_disciplinary_module_1.StaffDisciplinaryManagementModule,
            staff_management_notice_module_1.StaffNoticeManagementModule
        ],
        declarations: [
            staff_management_activities_component_1.StaffManagementActivitiesComponent
        ],
        providers: [],
    })
], StaffManagementActivitiesModule);
exports.StaffManagementActivitiesModule = StaffManagementActivitiesModule;
//# sourceMappingURL=staff-management-activities.module.js.map