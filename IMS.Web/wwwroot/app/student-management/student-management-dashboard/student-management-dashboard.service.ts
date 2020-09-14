import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class StudentManagementDashboardService {

    StudentManagementDashboardUrl = 'api/studentmanagement/dashboard';

    constructor(private http: HttpService) { }

    getStudentDashboardData() {
        return this.http.get(this.StudentManagementDashboardUrl);
    }
}
