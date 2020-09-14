import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class StaffManagementReportService {
  StaffManagementUrl = 'api/staffmanagement';
  constructor(private http: HttpService) { }

  getAllStaffByInsituteId() {
    return this.http.get(this.StaffManagementUrl);
  }

  getInitialDataForReports() {
    return this.http.get(this.StaffManagementUrl + '/initialdata/report');
  }
}
