import { Component, OnInit } from '@angular/core';
import { StaffLeaveManagementService } from '../staff-management-leave.service';
import { LoaderService } from '../../../shared/loader-service';
import { SnackbarService } from '../../../shared/snackbar-service';

@Component({
  moduleId: module.id,
  templateUrl: 'staff-management-leave-list.html'
})
export class ListStaffLeaveManagementComponent implements OnInit {
  initialData: any = {};
  leaves: any[] = [];
  pendings: any[] = [];
  classId: number;
  leaveTypeId: number;
  constructor(private staffLeaveManagementService: StaffLeaveManagementService, private loaderService: LoaderService,
    private snackBar: SnackbarService) {
  }

  ngOnInit() {
    this.getStaffLeaves();
  }

  getStaffLeaves() {
    this.loaderService.toggleLoader(true);
    this.staffLeaveManagementService.getStaffLeaves().then(res => {
      this.initialData = res.json();
      this.leaves = this.initialData.leaves;
      this.pendingList();
      this.loaderService.toggleLoader(false);
    });
  }

  numberOfDays(fromDate: string, endDate: string): number {
    if (fromDate && endDate) {
      var FromDate = new Date(fromDate);
      var EndDate = new Date(endDate);
      const diffTime = Math.abs(FromDate.getTime() - EndDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays + 1;
    } else {
      return 0;
    }
  }

  pendingList() {
    this.loaderService.toggleLoader(true);
    this.staffLeaveManagementService.getStudentPendingLeavesByStaffId(this.initialData.staffId).then(res => {
      this.pendings = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  approveAndRejectLeave(leaveId: number, type: string) {
    this.loaderService.toggleLoader(true);
    var leaveChangeRequest = { LeaveId: leaveId, Type: type };
    this.staffLeaveManagementService.approveAndRejectLeave(leaveChangeRequest).then(res => {
      var response = res.json();
      this.snackBar.showSnackbar(response.message);
      this.ngOnInit();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowedToEdit(id: number) {
    var leave = this.leaves.find(x => x.id === id);
    return (leave.leaveStatus.name === 'Pending');
  }
}
