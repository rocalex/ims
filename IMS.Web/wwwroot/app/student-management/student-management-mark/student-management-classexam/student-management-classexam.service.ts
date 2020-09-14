import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class StudentManagementClassExamService {
  ExamDefinitionManagementUrl = 'api/markmanagement/classexam';
  constructor(private http: HttpService) { }

  getInititalData() {
    return this.http.get(this.ExamDefinitionManagementUrl + '/initialdata');
  }

  addClassExam(classExam: any) {
    return this.http.post(this.ExamDefinitionManagementUrl, classExam);
  }

  getAllClassExams() {
    return this.http.get(this.ExamDefinitionManagementUrl);
  }

  getClassExams(classExamId: number) {
    return this.http.get(this.ExamDefinitionManagementUrl + '/' + classExamId);
  }

  updateClassExam(classExam: any) {
    return this.http.put(this.ExamDefinitionManagementUrl, classExam);
  }
}
