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
// Components
const institute_management_week_off_component_1 = require("./institute-management-week-off.component");
const institute_management_week_off_list_edit_component_1 = require("./institute-management-week-off-list-edit/institute-management-week-off-list-edit.component");
// Services
const institute_management_week_off_service_1 = require("./institute-management-week-off.service");
let WeekOffManagementModule = class WeekOffManagementModule {
};
WeekOffManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            institute_management_week_off_component_1.WeekOffManagementComponent,
            institute_management_week_off_list_edit_component_1.ListEditWeekOffManagementComponent
        ],
        providers: [
            institute_management_week_off_service_1.WeekOffManagementService
        ],
    })
], WeekOffManagementModule);
exports.WeekOffManagementModule = WeekOffManagementModule;
//# sourceMappingURL=institute-management-week-off.module.js.map