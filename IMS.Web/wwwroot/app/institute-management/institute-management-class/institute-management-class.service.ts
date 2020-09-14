import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { AddInstituteClass, UpdateInstituteClass } from './institute-management-class.model';

@Injectable()
export class ClassManagementService {
  ClassManagementUrl = 'api/instituteclassmanagement';
  constructor(private http: HttpService) { }

  getInstituteInstituteClasssList() {
    return this.http.get(this.ClassManagementUrl);
  }

  addInstituteClass(instituteClass: AddInstituteClass) {
    return this.http.post(this.ClassManagementUrl, instituteClass);
  }

  getInstituteClassDetails(instituteClassId: number) {
    return this.http.get(this.ClassManagementUrl + "/" + instituteClassId);
  }

  updateInstituteClass(instituteClass: UpdateInstituteClass) {
    return this.http.put(this.ClassManagementUrl, instituteClass);
  }

  getInitialData() {
    return this.http.get(this.ClassManagementUrl + '/initialdata');
  }
}
