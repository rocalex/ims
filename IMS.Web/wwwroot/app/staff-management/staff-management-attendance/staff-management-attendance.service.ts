import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class StaffAttendanceManagementService {
  StaffAttendanceManagementUrl = 'api/staffattendancemanagement';
  constructor(private http: HttpService) { }

  getIntialData() {
    return this.http.get(this.StaffAttendanceManagementUrl + '/intialdata');
  }

  addStaffAttendance(attendance: any) {
    return this.http.post(this.StaffAttendanceManagementUrl, attendance);
  }

  getStaffAttendance(StaffQuery: any) {
    return this.http.post(this.StaffAttendanceManagementUrl + '/search', StaffQuery);
  }

  getWeekOffsByCurrentAcademicYearId() {
    return this.http.get(this.StaffAttendanceManagementUrl + '/weekoff');
  }
}
