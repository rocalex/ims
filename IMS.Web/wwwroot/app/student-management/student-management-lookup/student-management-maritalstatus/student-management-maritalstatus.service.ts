import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class MaritalStatusManagementService {
  MaritalStatusManagementUrl = 'api/maritalstatusmanagement';
  constructor(private http: HttpService) { }

  addInstituteMaritalStatus(maritalStatus: any) {
    return this.http.post(this.MaritalStatusManagementUrl, maritalStatus);
  }

  getAllInstituteMaritalStatus() {
    return this.http.get(this.MaritalStatusManagementUrl);
  }

  getInstituteMaritalStatusDetail(maritalStatusId: number) {
    return this.http.get(this.MaritalStatusManagementUrl + '/' + maritalStatusId);
  }

  updateInstituteMaritalStatus(maritalStatus: any) {
    return this.http.put(this.MaritalStatusManagementUrl, maritalStatus);
  }
}
