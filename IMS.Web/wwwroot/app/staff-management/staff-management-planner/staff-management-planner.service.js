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
let StaffPlannerManagementService = class StaffPlannerManagementService {
    constructor(http) {
        this.http = http;
        this.StaffPlanManagementUrl = 'api/staffplannermanagement';
    }
    // Method for adding new staff plan
    addStaffPlan(staffPlan) {
        return this.http.post(this.StaffPlanManagementUrl, staffPlan);
    }
    // Method for fetching the list of all staff plans
    getAllStaffPlans() {
        return this.http.get(this.StaffPlanManagementUrl);
    }
    // Method for fetching staff plan details by id
    getStaffPlanDetailById(planId) {
        return this.http.get(this.StaffPlanManagementUrl + '/' + planId);
    }
    // Method for updating a staff plan
    updateStaffPlan(staffPlan) {
        return this.http.put(this.StaffPlanManagementUrl + '/' + staffPlan.id, staffPlan);
    }
    // Method for fetching the initial data for creating/updating plans
    getStaffPlanInitialData() {
        return this.http.get(this.StaffPlanManagementUrl + '/initial');
    }
};
StaffPlannerManagementService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], StaffPlannerManagementService);
exports.StaffPlannerManagementService = StaffPlannerManagementService;
//# sourceMappingURL=staff-management-planner.service.js.map