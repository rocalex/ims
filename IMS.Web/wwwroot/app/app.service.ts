import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';

@Injectable()
export class AppService {
  InstituteManagementUrl = 'api/institutemanagement';
  AcademicYearManagementUrl = 'api/instituteacademicyearmanagement';

  constructor(private http: HttpService) { }

  getInstitutesForLoggedInUser() {
    return this.http.get(this.InstituteManagementUrl + '/institutesforuser');
  }

  updateCurrentInstitute(instituteId: number) {
    return this.http.get(this.InstituteManagementUrl + '/institutesforuser/' + instituteId);
  }

  getAcademicYears() {
    return this.http.get(this.AcademicYearManagementUrl);
  }

  addorUpdateSelectedAcademicYear(academicYearId: number) {
    return this.http.get('api/usermanagement/selectacademicyear/' + academicYearId);
  }

  getSelectedAcademicYear() {
    return this.http.get('api/usermanagement/selectacademicyear');
  }
}
