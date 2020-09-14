import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class TeachingStaffManagementService {
  TeachingStaffManagementUrl = 'api/teachingstaffmanagement';
  constructor(private http: HttpService) { }

  getAllInstituteTeachingStaff() {
    return this.http.get(this.TeachingStaffManagementUrl);
  }

  addInstituteTeachingStaff(teachingStaff: any) {
    return this.http.post(this.TeachingStaffManagementUrl, teachingStaff);
  }

  getInstituteTeachingStaffDetail(teachingStaffId: number) {
    return this.http.get(this.TeachingStaffManagementUrl + '/' + teachingStaffId);
  }

  updateInstituteTeachingStaff(teachingStaff: any) {
    return this.http.put(this.TeachingStaffManagementUrl, teachingStaff);
  }
}
