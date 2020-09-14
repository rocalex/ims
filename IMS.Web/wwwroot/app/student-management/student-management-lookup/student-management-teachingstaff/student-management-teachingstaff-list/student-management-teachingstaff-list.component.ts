import { Component, OnInit } from '@angular/core';
import { TeachingStaffManagementService } from '../student-management-teachingstaff.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-teachingstaff-list.html'
})
export class ListTeachingStaffManagementComponent implements OnInit {
  teachingStaffs: any[] = [];
  constructor(private teachingStaffManagementService: TeachingStaffManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllInstituteTeachingStaff();
  }

  getAllInstituteTeachingStaff() {
    this.loaderService.toggleLoader(true);
    this.teachingStaffManagementService.getAllInstituteTeachingStaff().then(res => {
      this.teachingStaffs = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, type);
  }
}
