import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class StudentManagementInActiveService {
  StudentManagementUrl = 'api/studentmanagement';
  constructor(private http: HttpService) { }

  getAllInActiveStudentByInsituteId() {
    return this.http.get(this.StudentManagementUrl + '/inactive');
  }

  markActiveAndInActiveStudent(studentId: number) {
    return this.http.delete(this.StudentManagementUrl + '/inactive/' + studentId);
  }
}
