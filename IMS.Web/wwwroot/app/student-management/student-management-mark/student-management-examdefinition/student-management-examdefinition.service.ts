import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class StudentManagementExamDefinitionService {
  ExamDefinitionManagementUrl = 'api/markmanagement/examdefinition';
  constructor(private http: HttpService) { }

  addInstituteExamDefinition(examDefinition: any) {
    return this.http.post(this.ExamDefinitionManagementUrl, examDefinition);
  }

  getAllInstituteExamDefinition() {
    return this.http.get(this.ExamDefinitionManagementUrl);
  }

  getInstituteExamDefinitionDetail(examDefinitionId: number) {
    return this.http.get(this.ExamDefinitionManagementUrl + '/' + examDefinitionId);
  }

  updateInstituteExamDefinition(examDefinition: any) {
    return this.http.put(this.ExamDefinitionManagementUrl, examDefinition);
  }
}
