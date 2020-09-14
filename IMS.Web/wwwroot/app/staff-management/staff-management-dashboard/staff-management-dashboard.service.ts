import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class StaffManagementDashboardService {

    StaffManagementDashboardUrl = 'api/staffmanagement/dashboard';

    constructor(private http: HttpService) { }

    getStaffDashboardData() {
        return this.http.get(this.StaffManagementDashboardUrl);
    }
}
