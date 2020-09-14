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
const http_service_1 = require("../../core/http.service");
let StaffDisciplinaryManagementService = class StaffDisciplinaryManagementService {
    constructor(http) {
        this.http = http;
        this.StaffDisciplinaryManagementUrl = 'api/disciplinarymanagement';
    }
    addDisciplinary(disciplinary) {
        return this.http.post(this.StaffDisciplinaryManagementUrl, disciplinary);
    }
    getDisciplinaries() {
        return this.http.get(this.StaffDisciplinaryManagementUrl + '/staff');
    }
    getDisciplinary(id) {
        return this.http.get(this.StaffDisciplinaryManagementUrl + '/' + id);
    }
    updateDisciplinary(disciplinary) {
        return this.http.put(this.StaffDisciplinaryManagementUrl, disciplinary);
    }
    getInitialData() {
        return this.http.get(this.StaffDisciplinaryManagementUrl + '/initialdata');
    }
    isLoggedInUserIsStaff() {
        return this.http.get('api/home/isstaff');
    }
};
StaffDisciplinaryManagementService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], StaffDisciplinaryManagementService);
exports.StaffDisciplinaryManagementService = StaffDisciplinaryManagementService;
//# sourceMappingURL=staff-management-disciplinary.service.js.map