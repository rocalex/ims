import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class StaffActivityManagementService {

    StaffActivityManagementUrl = 'api/staffactivitymanagement';

    constructor(private http: HttpService) { }

    // Method for adding new activity
    addActivity(activity: any) {
        return this.http.post(this.StaffActivityManagementUrl, activity);
    }

    // Method for fetching the list of all activities
    getAllActivities() {
        return this.http.get(this.StaffActivityManagementUrl);
    }

    // Method for fetching activity details by id
    getActivityDetailById(activityId: number) {
        return this.http.get(this.StaffActivityManagementUrl + '/' + activityId);
    }

    // Method for updating an activity
    updateActivity(activity: any) {
        return this.http.put(this.StaffActivityManagementUrl + '/' + activity.id, activity);
    }

    // Method for fetching the initial data for creating/updating activities
    getStaffActivityInitialData() {
        return this.http.get(this.StaffActivityManagementUrl + '/initial');
    }
}
