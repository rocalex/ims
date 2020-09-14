import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { AddInstituteSubject, UpdateInstituteSubject } from './institute-management-subject.model';

@Injectable()
export class SubjectManagementService {
  SubjectManagementUrl = 'api/institutesubjectmanagement';
  constructor(private http: HttpService) { }

  getInstituteInstituteSubjectsList() {
    return this.http.get(this.SubjectManagementUrl);
  }

  addInstituteSubject(instituteSubject: AddInstituteSubject) {
    return this.http.post(this.SubjectManagementUrl, instituteSubject);
  }

  getInstituteSubjectDetails(instituteSubjectId: number) {
    return this.http.get(this.SubjectManagementUrl + "/" + instituteSubjectId);
  }

  updateInstituteSubject(instituteSubject: UpdateInstituteSubject) {
    return this.http.put(this.SubjectManagementUrl, instituteSubject);
  }
}
