import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';

@Injectable()
export class DashboardService {

  DashboardUrl = 'api/usermanagement/dashboard';
  StaffTimeTableUrl = 'api/timetablemanagement';
  StudentAttendanceUrl = 'api/studentattendancemanagement';

  constructor(private http: HttpService) { }

  getUserDashboardDetails(academicYearId: number) {
    return this.http.get(this.DashboardUrl + '/academicyear/' + academicYearId);
  }

  getStaffTimeTable(classId: number, sectionId: number, academicYearId: number) {
    return this.http.get(this.StaffTimeTableUrl + '/staff/details/' + classId + '/' + sectionId + '/' + academicYearId);
  }

  getStudentAttendanceForStudentDashboard(attendance: any) {
    return this.http.post(this.StudentAttendanceUrl + '/search/studentdashboard', attendance);
  }
}
