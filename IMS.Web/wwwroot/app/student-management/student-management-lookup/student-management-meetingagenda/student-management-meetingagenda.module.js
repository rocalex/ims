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
const student_management_meetingagenda_component_1 = require("./student-management-meetingagenda.component");
const student_management_meetingagenda_list_component_1 = require("./student-management-meetingagenda-list/student-management-meetingagenda-list.component");
const student_management_meetingagenda_add_component_1 = require("./student-management-meetingagenda-add/student-management-meetingagenda-add.component");
const student_management_meetingagenda_edit_detail_component_1 = require("./student-management-meetingagenda-edit-detail/student-management-meetingagenda-edit-detail.component");
const student_management_meetingagenda_service_1 = require("./student-management-meetingagenda.service");
let MeetingAgendaManagementModule = class MeetingAgendaManagementModule {
};
MeetingAgendaManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule
        ],
        declarations: [
            student_management_meetingagenda_component_1.MeetingAgendaManagementComponent,
            student_management_meetingagenda_list_component_1.ListMeetingAgendaManagementComponent,
            student_management_meetingagenda_add_component_1.AddMeetingAgendaManagementComponent,
            student_management_meetingagenda_edit_detail_component_1.EditAndDetailMeetingAgendaManagementComponent
        ],
        providers: [
            student_management_meetingagenda_service_1.MeetingAgendaManagementService
        ],
    })
], MeetingAgendaManagementModule);
exports.MeetingAgendaManagementModule = MeetingAgendaManagementModule;
//# sourceMappingURL=student-management-meetingagenda.module.js.map