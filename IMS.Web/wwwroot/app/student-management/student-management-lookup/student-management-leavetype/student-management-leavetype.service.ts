import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class LeaveTypeManagementService {
  LeaveTypeManagementUrl = 'api/leavetypemanagement';
  constructor(private http: HttpService) { }

  addInstituteLeaveType(leavetype: any) {
    return this.http.post(this.LeaveTypeManagementUrl, leavetype);
  }

  getAllInstituteLeaveType() {
    return this.http.get(this.LeaveTypeManagementUrl);
  }

  getInstituteLeaveTypeDetail(leavetypeId: number) {
    return this.http.get(this.LeaveTypeManagementUrl + '/' + leavetypeId);
  }

  updateInstituteLeaveType(leavetype: any) {
    return this.http.put(this.LeaveTypeManagementUrl, leavetype);
  }

  getInititalData() {
    return this.http.get(this.LeaveTypeManagementUrl + '/initialdata');
  }
}
