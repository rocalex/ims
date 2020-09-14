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
const institute_management_time_table_component_1 = require("./institute-management-time-table.component");
const institute_management_time_table_generate_component_1 = require("./institute-management-time-table-generate/institute-management-time-table-generate.component");
// Services
const institute_management_time_table_service_1 = require("./institute-management-time-table.service");
let TimeTableManagementModule = class TimeTableManagementModule {
};
TimeTableManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            institute_management_time_table_component_1.TimeTableManagementComponent,
            institute_management_time_table_generate_component_1.GenerateTimeTableManagementComponent
        ],
        providers: [
            institute_management_time_table_service_1.TimeTableManagementService
        ],
    })
], TimeTableManagementModule);
exports.TimeTableManagementModule = TimeTableManagementModule;
//# sourceMappingURL=institute-management-time-table.module.js.map