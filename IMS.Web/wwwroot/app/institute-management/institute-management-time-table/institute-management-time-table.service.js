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
let TimeTableManagementService = class TimeTableManagementService {
    constructor(http) {
        this.http = http;
        this.TimeTableManagementUrl = 'api/timetablemanagement';
    }
    // Method for fetching class-sections
    getClassSectionsList() {
        return this.http.get(this.TimeTableManagementUrl + '/class/sections/all');
    }
    // Method for fetching the initial data
    getTimeTableInitialData(classId, sectionId) {
        return this.http.get(this.TimeTableManagementUrl + '/initialdata/' + classId + '/' + sectionId);
    }
    // Method for bulk saving the time table data
    bulkSaveTimeTableData(addedTimeTable) {
        return this.http.post(this.TimeTableManagementUrl, addedTimeTable);
    }
    // Method for fetching the time table details for a particular academic year, class and section
    getTimeTableDetailsByAcademicYearId(classId, sectionId, academicYearId) {
        return this.http.get(this.TimeTableManagementUrl + '/details/' + classId + '/' + sectionId + '/' + academicYearId);
    }
};
TimeTableManagementService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], TimeTableManagementService);
exports.TimeTableManagementService = TimeTableManagementService;
//# sourceMappingURL=institute-management-time-table.service.js.map