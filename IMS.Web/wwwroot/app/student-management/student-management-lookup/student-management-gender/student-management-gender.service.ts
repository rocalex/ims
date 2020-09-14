import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class GenderManagementService {
  GenderManagementUrl = 'api/gendermanagement';
  constructor(private http: HttpService) { }

  addInstituteGender(gender: any) {
    return this.http.post(this.GenderManagementUrl, gender);
  }

  getAllInstituteGender() {
    return this.http.get(this.GenderManagementUrl);
  }

  getInstituteGenderDetail(genderId: number) {
    return this.http.get(this.GenderManagementUrl + '/' + genderId);
  }

  updateInstituteGender(gender: any) {
    return this.http.put(this.GenderManagementUrl, gender);
  }
}
