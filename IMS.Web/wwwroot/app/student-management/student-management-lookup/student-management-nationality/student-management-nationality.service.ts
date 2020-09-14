import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class NationalityManagementService {
  NationalityManagementUrl = 'api/institutenationalitymanagement';
  constructor(private http: HttpService) { }

  addInstituteNationality(nationality: any) {
    return this.http.post(this.NationalityManagementUrl, nationality);
  }

  getAllInstituteNationality() {
    return this.http.get(this.NationalityManagementUrl);
  }

  getInstituteNationalityDetail(nationalityId: number) {
    return this.http.get(this.NationalityManagementUrl + '/' + nationalityId);
  }

  updateInstituteNationality(nationality: any) {
    return this.http.put(this.NationalityManagementUrl, nationality);
  }
}
