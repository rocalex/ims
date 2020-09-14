"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_service_1 = require("../../../../core/http.service");
let MeetingAgendaManagementService = class MeetingAgendaManagementService {
    constructor(http) {
        this.http = http;
        this.MeetingAgendaManagementUrl = 'api/meetingagendamanagement';
    }
    addInstituteMeetingAgenda(meetingagenda) {
        return this.http.post(this.MeetingAgendaManagementUrl, meetingagenda);
    }
    getAllInstituteMeetingAgenda() {
        return this.http.get(this.MeetingAgendaManagementUrl);
    }
    getInstituteMeetingAgendaDetail(meetingagendaId) {
        return this.http.get(this.MeetingAgendaManagementUrl + '/' + meetingagendaId);
    }
    updateInstituteMeetingAgenda(meetingagenda) {
        return this.http.put(this.MeetingAgendaManagementUrl, meetingagenda);
    }
};
MeetingAgendaManagementService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], MeetingAgendaManagementService);
exports.MeetingAgendaManagementService = MeetingAgendaManagementService;
//# sourceMappingURL=student-management-meetingagenda.service.js.map