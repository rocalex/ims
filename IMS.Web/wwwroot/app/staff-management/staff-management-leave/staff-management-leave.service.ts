import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class StaffLeaveManagementService {
  StaffLeaveManagementUrl = 'api/leavemanagement/staff';
  constructor(private http: HttpService) { }

  addStaffLeave(leave: any) {
    return this.http.post(this.StaffLeaveManagementUrl, leave);
  }

  getStaffLeaves() {
    return this.http.get(this.StaffLeaveManagementUrl);
  }

  getStaffLeave(id: number) {
    return this.http.get(this.StaffLeaveManagementUrl + '/' + id);
  }

  updateStaffLeave(leave: any) {
    return this.http.put(this.StaffLeaveManagementUrl, leave);
  }

  getInitialData() {
    return this.http.get(this.StaffLeaveManagementUrl + '/initialdata');
  }

  getStaffAlreadyTakenLeaveCount(leave: any) {
    return this.http.post(this.StaffLeaveManagementUrl + '/leavecount', leave);
  }

  approveAndRejectLeave(leave: any) {
    return this.http.post(this.StaffLeaveManagementUrl + '/approveandreject', leave);
  }
}
