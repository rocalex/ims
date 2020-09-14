import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class QualificationManagementService {
  QualificationManagementUrl = 'api/qualificationmanagement';
  constructor(private http: HttpService) { }

  addInstituteQualification(qualification: any) {
    return this.http.post(this.QualificationManagementUrl, qualification);
  }

  getAllInstituteQualification() {
    return this.http.get(this.QualificationManagementUrl);
  }

  getInstituteQualificationDetail(qualificationId: number) {
    return this.http.get(this.QualificationManagementUrl + '/' + qualificationId);
  }

  updateInstituteQualification(qualification: any) {
    return this.http.put(this.QualificationManagementUrl, qualification);
  }
}
