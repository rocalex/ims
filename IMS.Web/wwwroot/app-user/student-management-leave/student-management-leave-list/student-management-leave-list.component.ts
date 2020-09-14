import { Component, OnInit } from '@angular/core';
import { StudentLeaveManagementService } from '../student-management-leave.service';
import { LoaderService } from '../../../shared/loader-service';
import { SnackbarService } from '../../../shared/snackbar-service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-leave-list.html'
})
export class ListStudentLeaveManagementComponent implements OnInit {
  initialData: any = {};
  leaves: any[] = [];
  classId: number;
  leaveTypeId: number;
  constructor(private studentLeaveManagementService: StudentLeaveManagementService, private loaderService: LoaderService,
    private snackBar: SnackbarService) {
  }

  ngOnInit() {
    this.getStudentLeaves();
  }

  getStudentLeaves() {
    this.loaderService.toggleLoader(true);
    this.studentLeaveManagementService.getStudentLeaves().then(res => {
      this.initialData = res.json();
      this.leaves = this.initialData.leaves;
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

  isAllowedToEdit(id: number) {
    var leave = this.leaves.find(x => x.id === id);
    return (leave.leaveStatus.name === 'Pending');
  }
}
