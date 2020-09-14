import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class StudentAttendanceManagementService {
  StudentAttendanceManagementUrl = 'api/studentattendancemanagement';
  constructor(private http: HttpService) { }

  getIntialDataForPromotion() {
    return this.http.get('api/studentpromotionmanagement/intialdata');
  }

  getStudentByClassId(classId: number, sectionId: number) {
    return this.http.get('api/studentpromotionmanagement/classstudent/' + classId + '/' + sectionId);
  }

  addStudentAttendance(attendance: any) {
    return this.http.post(this.StudentAttendanceManagementUrl, attendance);
  }

  getStudentAttendance(studentQuery: any) {
    return this.http.post(this.StudentAttendanceManagementUrl + '/search', studentQuery);
  }

  getWeekOffsByCurrentAcademicYearId() {
    return this.http.get(this.StudentAttendanceManagementUrl + '/weekoff');
  }
}
