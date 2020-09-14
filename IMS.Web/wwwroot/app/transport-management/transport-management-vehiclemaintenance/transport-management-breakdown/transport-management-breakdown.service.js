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
let TransportManagementBreakDownService = class TransportManagementBreakDownService {
    constructor(http) {
        this.http = http;
        this.BreakDownManagementUrl = 'api/vehiclebreakdownmanagement';
    }
    addBreakDown(breakdown) {
        return this.http.post(this.BreakDownManagementUrl, breakdown);
    }
    getBreakDowns() {
        return this.http.get(this.BreakDownManagementUrl);
    }
    getBreakDown(breakdownId) {
        return this.http.get(this.BreakDownManagementUrl + '/' + breakdownId);
    }
    updateBreakDown(breakdown) {
        return this.http.put(this.BreakDownManagementUrl, breakdown);
    }
    getInitialData() {
        return this.http.get(this.BreakDownManagementUrl + '/initialdata');
    }
};
TransportManagementBreakDownService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], TransportManagementBreakDownService);
exports.TransportManagementBreakDownService = TransportManagementBreakDownService;
//# sourceMappingURL=transport-management-breakdown.service.js.map