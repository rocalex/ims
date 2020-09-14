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
let OccupationManagementService = class OccupationManagementService {
    constructor(http) {
        this.http = http;
        this.OccupationManagementUrl = 'api/occupationmanagement';
    }
    addInstituteOccupation(occupation) {
        return this.http.post(this.OccupationManagementUrl, occupation);
    }
    getAllInstituteOccupation() {
        return this.http.get(this.OccupationManagementUrl);
    }
    getInstituteOccupationDetail(occupationId) {
        return this.http.get(this.OccupationManagementUrl + '/' + occupationId);
    }
    updateInstituteOccupation(occupation) {
        return this.http.put(this.OccupationManagementUrl, occupation);
    }
};
OccupationManagementService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], OccupationManagementService);
exports.OccupationManagementService = OccupationManagementService;
//# sourceMappingURL=student-management-occupation.service.js.map