import { Component, OnInit } from '@angular/core';
import { LeaveTypeManagementService } from '../student-management-leavetype.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-leavetype-list.html'
})
export class ListLeaveTypeManagementComponent implements OnInit {
  LeaveTypes: any[] = [];
  constructor(private leaveTypeManagementService: LeaveTypeManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllInstituteLeaveType();
  }

  getAllInstituteLeaveType() {
    this.loaderService.toggleLoader(true);
    this.leaveTypeManagementService.getAllInstituteLeaveType().then(res => {
      this.LeaveTypes = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, type);
  }
}
