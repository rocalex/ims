import { Component, OnInit } from '@angular/core';
import { StaffLeaveManagementService } from '../staff-management-leave.service';
import { LoaderService } from '../../../shared/loader-service';
import { SnackbarService } from '../../../shared/snackbar-service';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdateStaffLeaveAc } from '../staff-management-leave.model';

@Component({
  moduleId: module.id,
  templateUrl: 'staff-management-leave-edit-detail.html'
})
export class EditAndDetailStaffLeaveManagementComponent implements OnInit {
  initialData: any = {};
  leave: UpdateStaffLeaveAc = new UpdateStaffLeaveAc();
  leaveTypes: any[] = [];
  alreadyTakenLeaveCount: number = 0;
  todayDate: Date = new Date();
  constructor(private staffLeaveManagementService: StaffLeaveManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(res => this.leave.Id = +res.id);
    this.getInitialData();
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.staffLeaveManagementService.getInitialData().then(res => {
      this.initialData = res.json();
      this.getStaffLeave();
      this.loaderService.toggleLoader(false);
    });
  }

  getStaffLeave() {
    this.loaderService.toggleLoader(true);
    this.staffLeaveManagementService.getStaffLeave(this.leave.Id).then(res => {
      var response = res.json();
      if (!response) {
        this.router.navigate(['leavemanagement', 'list']);
      } else {
        this.leave.ApprovedById = response.approvedById;
        this.leave.EndDate = new Date(response.endDate);
        this.leave.FromDate = new Date(response.fromDate);
        this.leave.LeaveTypeId = response.leaveTypeId;
        this.leave.Reason = response.reason;
        this.leave.StatusId = response.statusId;
        this.leave.StaffId = response.staffId;
        this.assignLeaveTypes();
      }
      this.loaderService.toggleLoader(false);
    })
  }

  updateStaffLeave() {
    this.loaderService.toggleLoader(true);
    this.activeRoute.params.subscribe(res => this.leave.Id = +res.id);
    this.staffLeaveManagementService.updateStaffLeave(this.leave).then(res => {
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
