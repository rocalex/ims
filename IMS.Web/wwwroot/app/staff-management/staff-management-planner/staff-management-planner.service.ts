import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class StaffPlannerManagementService {

    StaffPlanManagementUrl = 'api/staffplannermanagement';

    constructor(private http: HttpService) { }

    // Method for adding new staff plan
    addStaffPlan(staffPlan: any) {
        return this.http.post(this.StaffPlanManagementUrl, staffPlan);
    }

    // Method for fetching the list of all staff plans
    getAllStaffPlans() {
        return this.http.get(this.StaffPlanManagementUrl);
    }

    // Method for fetching staff plan details by id
    getStaffPlanDetailById(planId: number) {
        return this.http.get(this.StaffPlanManagementUrl + '/' + planId);
    }

    // Method for updating a staff plan
    updateStaffPlan(staffPlan: any) {
        return this.http.put(this.StaffPlanManagementUrl + '/' + staffPlan.id, staffPlan);
    }

    // Method for fetching the initial data for creating/updating plans
    getStaffPlanInitialData() {
        return this.http.get(this.StaffPlanManagementUrl + '/initial');
    }
}
