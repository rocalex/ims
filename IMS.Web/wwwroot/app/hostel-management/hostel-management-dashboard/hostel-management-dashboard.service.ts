import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class HostelManagementDashboardService {

    HostelManagementDashboardUrl = 'api/hostelmanagement/dashboard';

    constructor(private http: HttpService) { }

    getStudentDashboardData() {
        return this.http.get(this.HostelManagementDashboardUrl);
    }
}
