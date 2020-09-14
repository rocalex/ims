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
const http_service_1 = require("../../../core/http.service");
let TimeSheetService = class TimeSheetService {
    constructor(http) {
        this.http = http;
        this.timesheetUrl = 'api/timesheet';
        this.staffUrl = 'api/staffManagement';
        this.academicUrl = 'api/instituteAcademicYearManagement';
    }
    getStaffList() {
        return this.http.get(this.staffUrl);
    }
    getAcademicList() {
        return this.http.get(this.academicUrl);
    }
    getTimesheetsForStaffByDate(id, date) {
        return this.http.post(this.timesheetUrl + `/${id}`, date);
    }
    getTimesheetsForStaffByMonth(id, month) {
        return this.http.get(this.timesheetUrl + `/${id}/${month}`);
    }
    getBookTypeById(id) {
        return this.http.get(this.timesheetUrl + `/${id}`);
    }
    saveTimesheetByMonth(timesheets) {
        return this.http.post(this.timesheetUrl, timesheets);
    }
    saveTimesheetsByDate(timesheet) {
        return this.http.put(this.timesheetUrl, timesheet);
    }
};
TimeSheetService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], TimeSheetService);
exports.TimeSheetService = TimeSheetService;
//# sourceMappingURL=timesheets.service.js.map