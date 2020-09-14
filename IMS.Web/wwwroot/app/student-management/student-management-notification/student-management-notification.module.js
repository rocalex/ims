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
const student_management_notification_routes_1 = require("./student-management-notification.routes");
const student_management_notification_component_1 = require("./student-management-notification.component");
const student_management_notification_service_1 = require("./student-management-notification.service");
let StudentManagementNotificationModule = class StudentManagementNotificationModule {
};
StudentManagementNotificationModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            student_management_notification_routes_1.StudentManagementNotificationRouting
        ],
        declarations: [
            student_management_notification_component_1.StudentManagementNotificationComponent
        ],
        providers: [
            student_management_notification_service_1.StudentManagementNotificationService
        ],
    })
], StudentManagementNotificationModule);
exports.StudentManagementNotificationModule = StudentManagementNotificationModule;
//# sourceMappingURL=student-management-notification.module.js.map