import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class BloodGroupManagementService {
  BloodGroupManagementUrl = 'api/bloodgroupmanagement';
  constructor(private http: HttpService) { }

  addInstituteBloodGroup(bloodGroup: any) {
    return this.http.post(this.BloodGroupManagementUrl, bloodGroup);
  }

  getAllInstituteBloodGroup() {
    return this.http.get(this.BloodGroupManagementUrl);
  }

  getInstituteBloodGroupDetail(bloodGroupId: number) {
    return this.http.get(this.BloodGroupManagementUrl + '/' + bloodGroupId);
  }

  updateInstituteBloodGroup(bloodGroup: any) {
    return this.http.put(this.BloodGroupManagementUrl, bloodGroup);
  }
}
