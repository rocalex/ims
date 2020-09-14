import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class ReligionCategoryManagementService {
  ReligionCategoryManagementUrl = 'api/religioncategorymanagement';
  constructor(private http: HttpService) { }

  addInstituteReligionCategory(religionCategory: any) {
    return this.http.post(this.ReligionCategoryManagementUrl, religionCategory);
  }

  getAllInstituteReligionCategory() {
    return this.http.get(this.ReligionCategoryManagementUrl);
  }

  getInstituteReligionCategoryDetail(religionCategoryId: number) {
    return this.http.get(this.ReligionCategoryManagementUrl + '/' + religionCategoryId);
  }

  updateInstituteReligionCategory(religionCategory: any) {
    return this.http.put(this.ReligionCategoryManagementUrl, religionCategory);
  }
}
