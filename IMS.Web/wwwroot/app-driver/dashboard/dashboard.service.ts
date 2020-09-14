import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';

@Injectable()
export class DashboardService {

    DashboardUrl = 'api/drivermastermanagement/dashboard';
    
    constructor(private http: HttpService) { }

    getDriverDashboardDetails() {
        return this.http.get(this.DashboardUrl);
    }
}
