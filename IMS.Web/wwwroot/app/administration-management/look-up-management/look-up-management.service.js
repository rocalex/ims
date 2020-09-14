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
let LookUpManagementService = class LookUpManagementService {
    constructor(http) {
        this.http = http;
        this.LookUpManagementUrl = 'api/lookupmanagement';
    }
    addLookUpMapping(lookUp) {
        return this.http.post(this.LookUpManagementUrl, lookUp);
    }
    getAllLookUpMapping() {
        return this.http.get(this.LookUpManagementUrl);
    }
    getLookUpMappingDetailById(lookUpId) {
        return this.http.get(this.LookUpManagementUrl + '/' + lookUpId);
    }
    updateLookUpMapping(lookUp) {
        return this.http.put(this.LookUpManagementUrl, lookUp);
    }
    getAllLookUps() {
        return this.http.get(this.LookUpManagementUrl + '/lookups');
    }
};
LookUpManagementService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], LookUpManagementService);
exports.LookUpManagementService = LookUpManagementService;
//# sourceMappingURL=look-up-management.service.js.map