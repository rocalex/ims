import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class StudentManagementReportService {
  StudentManagementUrl = 'api/studentmanagement';
  HomeworkManagementUrl = 'api/homeworkmanagement';
  constructor(private http: HttpService) { }

  getAllStudentByInsituteId() {
    return this.http.get(this.StudentManagementUrl);
  }

  getInitialDataForReports() {
    return this.http.get(this.StudentManagementUrl + '/initialdata/report');
  }

  getHomework(staffId: number, classId: number, sectionId: number) {
    return this.http.get(this.HomeworkManagementUrl + '/' + staffId + '/' + classId + '/' + sectionId);
  }
}
