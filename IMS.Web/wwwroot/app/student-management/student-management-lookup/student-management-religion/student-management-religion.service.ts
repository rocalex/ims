import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class ReligionManagementService {
  ReligionManagementUrl = 'api/religionmanagement';
  constructor(private http: HttpService) { }

  addInstituteReligion(religion: any) {
    return this.http.post(this.ReligionManagementUrl, religion);
  }

  getAllInstituteReligion() {
    return this.http.get(this.ReligionManagementUrl);
  }

  getInstituteReligionDetail(religionId: number) {
    return this.http.get(this.ReligionManagementUrl + '/' + religionId);
  }

  updateInstituteReligion(religion: any) {
    return this.http.put(this.ReligionManagementUrl, religion);
  }
}
