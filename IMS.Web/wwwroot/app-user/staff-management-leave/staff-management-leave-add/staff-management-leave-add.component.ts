import { Component, OnInit } from '@angular/core';
import { StaffLeaveManagementService } from '../staff-management-leave.service';
import { LoaderService } from '../../../shared/loader-service';
import { SnackbarService } from '../../../shared/snackbar-service';
import { Router } from '@angular/router';
import { AddStaffLeaveAc } from '../staff-management-leave.model';

@Component({
  moduleId: module.id,
  templateUrl: 'staff-management-leave-add.html'
})
export class AddStaffLeaveManagementComponent implements OnInit {
  initialData: any = {};
  leave: AddStaffLeaveAc = new AddStaffLeaveAc();
  leaveTypes: any[] = [];
  alreadyTakenLeaveCount: number = 0;
  todayDate: Date = new Date();
  constructor(private staffLeaveManagementService: StaffLeaveManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    this.getInitialData();
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.staffLeaveManagementService.getInitialData().then(res => {
      this.initialData = res.json();
      var pendingStatus = this.initialData.leaveStatuses.find(x => x.code === 'Pending');
      this.leave.StatusId = pendingStatus.id;
      this.leave.ApprovedById = this.initialData.admin.id;
      this.leave.StaffId = this.initialData.staff.id;
      this.assignLeaveTypes();
      this.loaderService.toggleLoader(false);
    });
  }

  addStaffLeave() {
    this.loaderService.toggleLoader(true);
    this.staffLeaveManagementService.addStaffLeave(this.leave).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['leavemanagement', 'list']);
      }
      this.snackBar.showSnackbar(response.message);
      this.loaderService.toggleLoader(false);
    });
  }

  endDateValid(): Date {
    if (this.leave.FromDate) {
      return this.leave.FromDate;
    } else {
      return this.todayDate;
    }
  }

  assignLeaveTypes() {
    var allowedTos: any[] = [];
    for (var i = 0; i < this.initialData.leaveTypes.length; i++) {
      var allow = this.initialData.leaveTypes[i].leaveAssignedTos;
      for (var j = 0; j < allow.length; j++) {
        allowedTos.push(allow[j]);
      }
    }
    var Staff = this.initialData.staffs.find(x => x.id === this.leave.StaffId);
    var StaffLeaveType = allowedTos.filter(x => x.userId === Staff.userId);
    var leaveTypeIds = StaffLeaveType.map(x => x.leaveTypeId);
    leaveTypeIds = this.distinct(leaveTypeIds);
    this.leaveTypes = [];
    for (var i = 0; i < leaveTypeIds.length; i++) {
      this.leaveTypes.push(this.initialData.leaveTypes.find(x => x.id === leaveTypeIds[i]));
    }
  }

  distinct(arr: any[]) {
    var unique = arr.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })
    return unique;
  }

  numberOfDays(): number {
    if (this.leave.FromDate && this.leave.EndDate) {
      const diffTime = Math.abs(this.leave.FromDate.getTime() - this.leave.EndDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays + 1;
    } else {
      return 0;
    }
  }

  balanceLeave(): number {
    if (this.leave.LeaveTypeId) {
      var leaveType = this.initialData.leaveTypes.find(x => x.id === this.leave.LeaveTypeId);
      var diff = leaveType.numberOfAllowedLeave - this.alreadyTakenLeaveCount;
      return diff;
    } else {
      return 0;
    }
  }

  getStaffAlreadyTakenLeaveCount() {
    this.loaderService.toggleLoader(true);
    var countModel = { StaffId: this.leave.StaffId, LeaveTypeId: this.leave.LeaveTypeId };
    this.staffLeaveManagementService.getStaffAlreadyTakenLeaveCount(countModel).then(res => {
      var response = res.json();
      this.alreadyTakenLeaveCount = response.count;
      this.loaderService.toggleLoader(false);
    });
  }
}
