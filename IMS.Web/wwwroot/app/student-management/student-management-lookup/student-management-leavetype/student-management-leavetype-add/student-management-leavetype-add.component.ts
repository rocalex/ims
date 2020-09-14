import { Component, OnInit } from '@angular/core';
import { LeaveTypeManagementService } from '../student-management-leavetype.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { AddLeaveTypeManagementAc, LeaveTypeManagementResponse, LeaveTypeManagementResponseType } from '../student-management-leavetype.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-leavetype-add.html'
})
export class AddLeaveTypeManagementComponent implements OnInit {
  baseModel: AddLeaveTypeManagementAc = new AddLeaveTypeManagementAc();
  error: LeaveTypeManagementResponse = new LeaveTypeManagementResponse();
  inititalData: any = {};
  assignedTypes: string[] = ['All', 'Student', 'Staff', 'Users'];
  users: any[] = [];
  constructor(private leaveTypeManagementService: LeaveTypeManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    this.baseModel.LeaveAssignedTypeEnumDescription = this.assignedTypes[0];
    this.getInititalData();
  }

  getInititalData() {
    this.loaderService.toggleLoader(true);
    this.leaveTypeManagementService.getInititalData().then(res => {
      this.inititalData = res.json();
      this.assignUser();
      this.loaderService.toggleLoader(false);
    })
  }

  addInstituteLeaveType() {
    this.loaderService.toggleLoader(true);
    this.leaveTypeManagementService.addInstituteLeaveType(this.baseModel).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'lookup', 'leavetype', 'list']);
        this.snackBar.showSnackbar(response.message);
      } else {
        this.error = new LeaveTypeManagementResponse();
        this.error.ErrorType = response.errorType;
        this.error.HasError = response.hasError;
        this.error.Message = response.message;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  hasError(fieldName: string) {
    var id = LeaveTypeManagementResponseType[fieldName];
    if (this.error.ErrorType === id) {
      return this.error.HasError;
    } else {
      return false;
    }
  }

  resetError(fieldName: string) {
    var id = LeaveTypeManagementResponseType[fieldName];
    if (this.error.ErrorType === id) {
      this.error = new LeaveTypeManagementResponse();
    }
  }

  assignUser() {
    this.baseModel.LeaveAssignedTos = [];
    this.users = [];
    switch (this.baseModel.LeaveAssignedTypeEnumDescription) {
      case 'All': {
        this.users.push({ name: 'Students', list: this.inititalData.groupUsers.students });
        this.users.push({ name: 'Staffs', list: this.inititalData.groupUsers.staffs });
        this.users.push({ name: 'Users', list: this.inititalData.groupUsers.users });
      } break;
      case 'Student': {
        this.users.push({ name: 'Students', list: this.inititalData.groupUsers.students });
      } break;
      case 'Staff': {
        this.users.push({ name: 'Staffs', list: this.inititalData.groupUsers.staffs });
      } break;
      case 'Users': {
        this.users.push({ name: 'Users', list: this.inititalData.groupUsers.users });
      } break;
    }
  }
}
