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
const institute_management_holiday_off_component_1 = require("./institute-management-holiday-off.component");
const institute_management_holiday_off_list_component_1 = require("./institute-management-holiday-off-list/institute-management-holiday-off-list.component");
const institute_management_holiday_off_add_component_1 = require("./institute-management-holiday-off-add/institute-management-holiday-off-add.component");
const institute_management_holiday_off_edit_details_component_1 = require("./institute-management-holiday-off-edit-details/institute-management-holiday-off-edit-details.component");
// Services
const institute_management_holiday_off_service_1 = require("./institute-management-holiday-off.service");
let HolidayOffManagementModule = class HolidayOffManagementModule {
};
HolidayOffManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            institute_management_holiday_off_component_1.HolidayOffManagementComponent,
            institute_management_holiday_off_list_component_1.ListHolidayOffManagementComponent,
            institute_management_holiday_off_add_component_1.AddHolidayOffManagementComponent,
            institute_management_holiday_off_edit_details_component_1.EditDetailsHolidayOffManagementComponent
        ],
        providers: [
            institute_management_holiday_off_service_1.HolidayOffManagementService
        ],
    })
], HolidayOffManagementModule);
exports.HolidayOffManagementModule = HolidayOffManagementModule;
//# sourceMappingURL=institute-management-holiday-off.module.js.map