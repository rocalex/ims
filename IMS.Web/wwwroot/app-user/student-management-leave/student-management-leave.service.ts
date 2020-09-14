import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';

@Injectable()
export class StudentLeaveManagementService {
  StudentLeaveManagementUrl = 'api/leavemanagement/student';
  constructor(private http: HttpService) { }

  addStudentLeave(leave: any) {
    return this.http.post(this.StudentLeaveManagementUrl, leave);
  }

  getStudentLeaves() {
    return this.http.get(this.StudentLeaveManagementUrl + '/bystudentid');
  }

  getStudentLeave(id: number) {
    return this.http.get(this.StudentLeaveManagementUrl + '/' + id);
  }

  updateStudentLeave(leave: any) {
    return this.http.put(this.StudentLeaveManagementUrl, leave);
  }

  getInitialData() {
    return this.http.get(this.StudentLeaveManagementUrl + '/initialdata');
  }

  getStudentAlreadyTakenLeaveCount(leave: any) {
    return this.http.post(this.StudentLeaveManagementUrl + '/leavecount', leave);
  }
}
