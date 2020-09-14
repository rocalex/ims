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
let AcademicYearManagementService = class AcademicYearManagementService {
    constructor(http) {
        this.http = http;
        this.AcademicYearManagementUrl = 'api/instituteacademicyearmanagement';
    }
    // Method for fetching the list of all academic years
    getInstituteAcademicYearsList() {
        return this.http.get(this.AcademicYearManagementUrl);
    }
    // Method for adding a new academic year
    addAcademicYear(academicYear) {
        return this.http.post(this.AcademicYearManagementUrl, academicYear);
    }
    // Method for fetching the details of an academic year by id
    getAcademicYearDetails(academicYearId) {
        return this.http.get(this.AcademicYearManagementUrl + "/" + academicYearId);
    }
    // Method for updating academic year
    updateAcademicYear(academicYear) {
        return this.http.put(this.AcademicYearManagementUrl + '/' + academicYear.id, academicYear);
    }
};
AcademicYearManagementService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], AcademicYearManagementService);
exports.AcademicYearManagementService = AcademicYearManagementService;
//# sourceMappingURL=institute-management-academic-year.service.js.map