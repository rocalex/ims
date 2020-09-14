import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { AddStudentInformationManagementAc, UpdateStudentInformationManagementAc } from './student-management-relieving.model';

@Injectable()
export class StudentRelievingManagementService {
  StudentRelievingManagementUrl = 'api/studentrelievingmanagement';
  constructor(private http: HttpService) { }

  addStudentDetail(student: AddStudentInformationManagementAc[]) {
    return this.http.post(this.StudentRelievingManagementUrl, student);
  }

  getAllStudentByInsituteId() {
    return this.http.get(this.StudentRelievingManagementUrl);
  }

  getStudentDetail(studentId: number) {
    return this.http.get(this.StudentRelievingManagementUrl + '/' + studentId);
  }

  updateStudent(student: UpdateStudentInformationManagementAc) {
    return this.http.put(this.StudentRelievingManagementUrl, student);
  }

  getAllClasses() {
    return this.http.get('api/instituteclassmanagement');
  }

  getStudentByClassId(classId: number) {
    return this.http.get(this.StudentRelievingManagementUrl + '/classstudent/' + classId);
  }
}
