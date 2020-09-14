import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { ExamPaper } from './exampaper.model';

@Injectable()
export class ExamPaperService {
  examPaperURL = 'api/examPaper';
  classUrl = 'api/instituteClassManagement';
  academicUrl = 'api/instituteAcademicYearManagement';

  constructor(private http: HttpService) {}

  getExamPapersForLoggedInUser() {
    return this.http.get(this.examPaperURL);
  }

  getClassList() {
      return this.http.get(this.classUrl);
  }

  getAcademicList() {
      return this.http.get(this.academicUrl);
  }

  getMappingByClassId(id) {
      return this.http.get(this.examPaperURL + `/mapping/${id}`);
  }

  getExamPaperById(id: number) {
    return this.http.get(this.examPaperURL + `/${id}`);
  }

  addExamPaper(examPaper: ExamPaper) {
    return this.http.post(this.examPaperURL, examPaper);
  }

  updateExamPaper(examPaper: ExamPaper) {
    return this.http.put(this.examPaperURL, examPaper);
  }

  deleteExamPaper(examPaperId: number) {
    return this.http.delete(this.examPaperURL + '/' + examPaperId);
  }
}