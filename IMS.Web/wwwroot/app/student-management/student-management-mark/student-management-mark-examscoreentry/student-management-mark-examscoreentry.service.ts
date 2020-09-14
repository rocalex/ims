import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class StudentManagementExamScoreEntryService {
  ExamDefinitionManagementUrl = 'api/markmanagement/classexam';
  ExamScoreEntryManagementUrl = 'api/markmanagement/examscoreentry';
  FeeReceiptManagementUrl = 'api/feereceiptmanagement';
  constructor(private http: HttpService) { }

  getInititalData() {
    return this.http.get(this.ExamDefinitionManagementUrl + '/initialdata');
  }

  addOrUpdateExamScoreEntry(addExamScoreEntries: any[]) {
    return this.http.post(this.ExamScoreEntryManagementUrl, addExamScoreEntries);
  }

  getExamScoreEntries(examId: number) {
    return this.http.get(this.ExamScoreEntryManagementUrl + '/' + examId);
  }

  getClassExamByClassAndSectionId(classId: number, sectionId: number) {
    return this.http.get(this.ExamScoreEntryManagementUrl + '/classexam/' + classId + '/' + sectionId);
  }

  getStudentByClassAndSectionId(classId: number, sectionId: number) {
    return this.http.get(this.FeeReceiptManagementUrl + '/searchstudent/' + classId + '/' + sectionId + '/' + null);
  }
}
