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
let GenderManagementService = class GenderManagementService {
    constructor(http) {
        this.http = http;
        this.GenderManagementUrl = 'api/gendermanagement';
    }
    addInstituteGender(gender) {
        return this.http.post(this.GenderManagementUrl, gender);
    }
    getAllInstituteGender() {
        return this.http.get(this.GenderManagementUrl);
    }
    getInstituteGenderDetail(genderId) {
        return this.http.get(this.GenderManagementUrl + '/' + genderId);
    }
    updateInstituteGender(gender) {
        return this.http.put(this.GenderManagementUrl, gender);
    }
};
GenderManagementService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], GenderManagementService);
exports.GenderManagementService = GenderManagementService;
//# sourceMappingURL=student-management-gender.service.js.map