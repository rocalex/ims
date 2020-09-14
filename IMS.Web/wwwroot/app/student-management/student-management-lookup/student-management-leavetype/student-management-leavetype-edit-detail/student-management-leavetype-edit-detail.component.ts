import { Component, OnInit } from '@angular/core';
import { LeaveTypeManagementService } from '../student-management-leavetype.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { UpdateLeaveTypeManagementAc, LeaveTypeManagementResponse, LeaveTypeManagementResponseType } from '../student-management-leavetype.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-leavetype-edit-detail.html'
})
export class EditAndDetailLeaveTypeManagementComponent implements OnInit {
  baseModel: UpdateLeaveTypeManagementAc = new UpdateLeaveTypeManagementAc();
  error: LeaveTypeManagementResponse = new LeaveTypeManagementResponse();
  inititalData: any = {};
  assignedTypes: string[] = ['All', 'Student', 'Staff', 'Users'];
  users: any[] = [];
  constructor(private leaveTypeManagementService: LeaveTypeManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(res => this.baseModel.Id = +res.id);
    this.getInititalData();
  }

  getInititalData() {
    this.loaderService.toggleLoader(true);
    this.leaveTypeManagementService.getInititalData().then(res => {
      this.inititalData = res.json();
      this.getInstituteLeaveTypeDetail();
      this.loaderService.toggleLoader(false);
    })
  }

  getInstituteLeaveTypeDetail() {
    this.loaderService.toggleLoader(true);
    this.leaveTypeManagementService.getInstituteLeaveTypeDetail(this.baseModel.Id).then(res => {
      var response = res.json();
      if (!response) {
        this.snackBar.showSnackbar('Leave type not found');
        this.router.navigate(['student', 'lookup', 'leavetype', 'list']);
      } else {
        this.baseModel.Name = response.name;
        this.baseModel.Code = response.code;
        this.baseModel.Description = response.description;
        this.baseModel.LeaveAssignedTypeEnumDescription = response.leaveAssignedTypeEnumDescription;
        this.baseModel.NumberOfAllowedLeave = response.numberOfAllowedLeave;
        this.assignUser();
        this.baseModel.LeaveAssignedTos = response.leaveAssignedTos.map(x => x.userId);
      }
      this.loaderService.toggleLoader(false);
    })
  }

  updateInstituteLeaveType() {
    this.loaderService.toggleLoader(true);
    this.leaveTypeManagementService.updateInstituteLeaveType(this.baseModel).then(res => {
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
