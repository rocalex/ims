import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class StudentFeeManagementStudentFeeService {
  StudentFeeManagementUrl = 'api/studentfeemanagement';
  constructor(private http: HttpService) { }

  getStudentFee(studentId: number) {
    return this.http.get(this.StudentFeeManagementUrl + '/' + studentId);
  }

  updateStudentFee(studentFeeComponents: any, studentFeeId: number) {
    return this.http.put(this.StudentFeeManagementUrl + '/' + studentFeeId, studentFeeComponents);
  }

  getInitialData() {
    return this.http.get(this.StudentFeeManagementUrl + '/intitaldata');
  }

  getStudentByClassAndSectionId(classId: number, sectionId: number) {
    return this.http.get('api/feerefundmanagement/searchstudent/' + classId + '/' + sectionId);
  }
}
