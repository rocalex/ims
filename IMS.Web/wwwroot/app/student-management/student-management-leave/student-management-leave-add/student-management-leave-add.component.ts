import { Component, OnInit } from '@angular/core';
import { StudentLeaveManagementService } from '../student-management-leave.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { AddStudentLeaveAc } from '../student-management-leave.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-leave-add.html'
})
export class AddStudentLeaveManagementComponent implements OnInit {
  initialData: any = {};
  leave: AddStudentLeaveAc = new AddStudentLeaveAc();
  students: any[] = [];
  leaveTypes: any[] = [];
  alreadyTakenLeaveCount: number = 0;
  todayDate: Date = new Date();
  constructor(private studentLeaveManagementService: StudentLeaveManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    this.getInitialData();
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.studentLeaveManagementService.getInitialData().then(res => {
      this.initialData = res.json();
      var pendingStatus = this.initialData.leaveStatuses.find(x => x.code === 'Pending');
      this.leave.StatusId = pendingStatus.id;
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

  addStudentLeave() {
    this.loaderService.toggleLoader(true);
    this.studentLeaveManagementService.addStudentLeave(this.leave).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'leavemanagement', 'list']);
      }
      this.snackBar.showSnackbar(response.message);
      this.loaderService.toggleLoader(false);
    });
  }

  getStudentAlreadyTakenLeaveCount() {
    this.loaderService.toggleLoader(true);
    var countModel = { StudentId: this.leave.StudentId, LeaveTypeId: this.leave.LeaveTypeId };
    this.studentLeaveManagementService.getStudentAlreadyTakenLeaveCount(countModel).then(res => {
      var response = res.json();
      this.alreadyTakenLeaveCount = response.count;
      this.loaderService.toggleLoader(false);
    });
  }

  assignStudent() {
    this.leave.StudentId = undefined;
    this.students = this.initialData.students.filter(x => x.currentClassId === this.leave.ClassId);
    var classData = this.initialData.classes.find(x => x.id === this.leave.ClassId);
    this.leave.ApprovedById = classData.classTeacherId;
  }

  assignLeaveTypes() {
    var allowedTos: any[] = [];
    for (var i = 0; i < this.initialData.leaveTypes.length; i++) {
      var allow = this.initialData.leaveTypes[i].leaveAssignedTos;
      for (var j = 0; j < allow.length; j++) {
        allowedTos.push(allow[j]);
      }
    }
    var student = this.students.find(x => x.id === this.leave.StudentId);
    var studentLeaveType = allowedTos.filter(x => x.userId === student.userId);
    var leaveTypeIds = studentLeaveType.map(x => x.leaveTypeId);
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
}
