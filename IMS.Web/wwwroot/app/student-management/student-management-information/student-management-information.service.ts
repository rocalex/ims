import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class StudentManagementService {
  StudentManagementUrl = 'api/studentmanagement';

  constructor(private http: HttpService) { }

  addStudentDetail(student: any) {
    return this.http.post(this.StudentManagementUrl, student);
  }

  getClassList() {
    return this.http.get(this.StudentManagementUrl + '/classlist');
  }

  getInitialDataForAddOrEditStudentBundle() {
    return this.http.get(this.StudentManagementUrl + '/bundle');
  }

  getAllStudentByInsituteId(classId: number) {
    return this.http.get(this.StudentManagementUrl + `/class/${classId}`);
  }

  getStudentDetail(studentId: number) {
    return this.http.get(this.StudentManagementUrl + '/' + studentId);
  }

  updateStudent(student: any) {
    return this.http.put(this.StudentManagementUrl, student);
  }

  addOrUpdateStudentImage(studentId: number, formData: FormData) {
    return this.http.postForFormData(this.StudentManagementUrl + '/image/' + studentId, formData);
  }

  archiveStudent(studentId: number) {
    return this.http.delete(this.StudentManagementUrl + '/' + studentId);
  }

  addOrUpdateStudentGallery(studentId: number, formData: FormData) {
    return this.http.postForFormData(this.StudentManagementUrl + '/gallery/' + studentId, formData);
  }

  markActiveAndInActiveStudent(studentId: number) {
    return this.http.delete(this.StudentManagementUrl + '/inactive/' + studentId);
  }

  getAutoSequenceNumberByTypeAndInstituteId() {
    return this.http.get('api/autosequencegeneratormanagement/generator/Roll Number');
  }

  getInititalData() {
    return this.http.get('api/markmanagement/classexam/initialdata');
  }

  importExcelData(formData: FormData) {
    return this.http.postForFormData(this.StudentManagementUrl + '/import', formData);
  }

  addOrUpdateStudentDocument(studentId: number, formData: FormData) {
    return this.http.postForFormData(this.StudentManagementUrl + '/document/' + studentId, formData);
  }

  updateDocumentData(updateDocumentData: any[], studentId: number) {
    return this.http.put(this.StudentManagementUrl + '/documentdata/' + studentId, updateDocumentData);
  }
}
