import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { AddInstitute } from './institute-management.model';

@Injectable()
export class InstituteManagementService {
  InstituteManagementUrl = 'api/institutemanagement';
  constructor(private http: HttpService) { }

  addInstitute(addInstitute: AddInstitute) {
    return this.http.post(this.InstituteManagementUrl, addInstitute);
  }

  getAllInstitute() {
    return this.http.get(this.InstituteManagementUrl);
  }

  getInstituteDetail(instituteId: number) {
    return this.http.get(this.InstituteManagementUrl + '/' + instituteId);
  }

  getAllUser() {
    return this.http.get(this.InstituteManagementUrl + '/allusers');
  }

  updateInstitute(addInstitute: any) {
    return this.http.put(this.InstituteManagementUrl, addInstitute);
  }
}
