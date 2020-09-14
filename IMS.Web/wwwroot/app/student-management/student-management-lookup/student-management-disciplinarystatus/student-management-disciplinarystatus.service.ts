import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class DisciplinaryStatusManagementService {
  DisciplinaryStatusManagementUrl = 'api/disciplinarystatusmanagement';
  constructor(private http: HttpService) { }

  addInstituteDisciplinaryStatus(disciplinarystatus: any) {
    return this.http.post(this.DisciplinaryStatusManagementUrl, disciplinarystatus);
  }

  getAllInstituteDisciplinaryStatus() {
    return this.http.get(this.DisciplinaryStatusManagementUrl);
  }

  getInstituteDisciplinaryStatusDetail(disciplinarystatusId: number) {
    return this.http.get(this.DisciplinaryStatusManagementUrl + '/' + disciplinarystatusId);
  }

  updateInstituteDisciplinaryStatus(disciplinarystatus: any) {
    return this.http.put(this.DisciplinaryStatusManagementUrl, disciplinarystatus);
  }
}
