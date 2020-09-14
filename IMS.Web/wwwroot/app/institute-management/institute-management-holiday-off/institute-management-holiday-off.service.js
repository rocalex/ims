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
// Model
let HolidayOffManagementService = class HolidayOffManagementService {
    constructor(http) {
        this.http = http;
        this.HolidayManagementUrl = 'api/holidaymanagement';
    }
    // Method for fetching the holidays for the selected academic year
    getHolidayssForSelectedAcademicYear(selectedAcademicYearId) {
        return this.http.get(this.HolidayManagementUrl + "/academicyear/" + selectedAcademicYearId);
    }
    // Method for fetching the list of holiday occurance types
    getHolidayOccuranceTypesList(academicYeadId) {
        return this.http.get(this.HolidayManagementUrl + '/' + academicYeadId + "/occurance/all");
    }
    // Method for adding new holiday
    addHoliday(holiday) {
        return this.http.post(this.HolidayManagementUrl, holiday);
    }
    // Method for fetching the details of the holiday
    getHolidayDetails(holidayId) {
        return this.http.get(this.HolidayManagementUrl + "/holiday/" + holidayId);
    }
    // Method for updating holiday
    updateHoliday(holiday) {
        return this.http.put(this.HolidayManagementUrl + '/' + holiday.id, holiday);
    }
    // Method for deleting holiday
    deleteHoliday(holidayId) {
        return this.http.delete(this.HolidayManagementUrl + "/" + holidayId);
    }
};
HolidayOffManagementService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], HolidayOffManagementService);
exports.HolidayOffManagementService = HolidayOffManagementService;
//# sourceMappingURL=institute-management-holiday-off.service.js.map