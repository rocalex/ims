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
const student_management_sport_detail_component_1 = require("./student-management-sport-detail.component");
const student_management_sport_detail_list_component_1 = require("./student-management-sport-detail-list/student-management-sport-detail-list.component");
const student_management_sport_detail_add_component_1 = require("./student-management-sport-detail-add/student-management-sport-detail-add.component");
const student_management_sport_detail_edit_detail_component_1 = require("./student-management-sport-detail-edit-detail/student-management-sport-detail-edit-detail.component");
const student_management_sport_detail_service_1 = require("./student-management-sport-detail.service");
let SportDetailManagementModule = class SportDetailManagementModule {
};
SportDetailManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            student_management_sport_detail_component_1.SportDetailManagementComponent,
            student_management_sport_detail_list_component_1.ListSportDetailManagementComponent,
            student_management_sport_detail_add_component_1.AddSportDetailManagementComponent,
            student_management_sport_detail_edit_detail_component_1.EditAndDetailSportDetailManagementComponent
        ],
        providers: [
            student_management_sport_detail_service_1.SportDetailManagementService
        ],
    })
], SportDetailManagementModule);
exports.SportDetailManagementModule = SportDetailManagementModule;
//# sourceMappingURL=student-management-sport-detail.module.js.map