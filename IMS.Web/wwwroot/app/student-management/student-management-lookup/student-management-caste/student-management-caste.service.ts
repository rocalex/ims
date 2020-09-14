import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class CasteManagementService {
  CasteManagementUrl = 'api/castemanagement';
  constructor(private http: HttpService) { }

  addInstituteCaste(caste: any) {
    return this.http.post(this.CasteManagementUrl, caste);
  }

  getAllInstituteCaste() {
    return this.http.get(this.CasteManagementUrl);
  }

  getInstituteCasteDetail(casteId: number) {
    return this.http.get(this.CasteManagementUrl + '/' + casteId);
  }

  updateInstituteCaste(caste: any) {
    return this.http.put(this.CasteManagementUrl, caste);
  }
}
