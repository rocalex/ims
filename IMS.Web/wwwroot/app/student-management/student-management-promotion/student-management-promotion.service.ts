import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { AddStudentInformationManagementAc, UpdateStudentInformationManagementAc } from './student-management-promotion.model';

@Injectable()
export class StudentPromotionManagementService {
  StudentPromotionManagementUrl = 'api/studentpromotionmanagement';
  constructor(private http: HttpService) { }

  addStudentDetail(student: AddStudentInformationManagementAc[]) {
    return this.http.post(this.StudentPromotionManagementUrl, student);
  }

  getAllStudentByInsituteId() {
    return this.http.get(this.StudentPromotionManagementUrl);
  }

  getStudentDetail(studentId: number) {
    return this.http.get(this.StudentPromotionManagementUrl + '/' + studentId);
  }

  updateStudent(student: UpdateStudentInformationManagementAc) {
    return this.http.put(this.StudentPromotionManagementUrl, student);
  }

  getIntialDataForPromotion() {
    return this.http.get(this.StudentPromotionManagementUrl + '/intialdata');
  }

  getStudentByClassId(classId: number, sectionId: number) {
    return this.http.get(this.StudentPromotionManagementUrl + '/classstudent/' + classId + '/' + sectionId);
  }
}
