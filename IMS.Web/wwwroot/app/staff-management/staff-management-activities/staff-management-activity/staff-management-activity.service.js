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
let StaffActivityManagementService = class StaffActivityManagementService {
    constructor(http) {
        this.http = http;
        this.StaffActivityManagementUrl = 'api/staffactivitymanagement';
    }
    // Method for adding new activity
    addActivity(activity) {
        return this.http.post(this.StaffActivityManagementUrl, activity);
    }
    // Method for fetching the list of all activities
    getAllActivities() {
        return this.http.get(this.StaffActivityManagementUrl);
    }
    // Method for fetching activity details by id
    getActivityDetailById(activityId) {
        return this.http.get(this.StaffActivityManagementUrl + '/' + activityId);
    }
    // Method for updating an activity
    updateActivity(activity) {
        return this.http.put(this.StaffActivityManagementUrl + '/' + activity.id, activity);
    }
    // Method for fetching the initial data for creating/updating activities
    getStaffActivityInitialData() {
        return this.http.get(this.StaffActivityManagementUrl + '/initial');
    }
};
StaffActivityManagementService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], StaffActivityManagementService);
exports.StaffActivityManagementService = StaffActivityManagementService;
//# sourceMappingURL=staff-management-activity.service.js.map