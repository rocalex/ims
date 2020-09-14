import { Component, OnInit } from '@angular/core';
import { BloodGroupManagementService } from '../student-management-blood-group.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-blood-group-list.html'
})
export class ListBloodGroupManagementComponent implements OnInit {
  bloodGroups: any[] = [];
  constructor(private bloodGroupManagementService: BloodGroupManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllInstituteBloodGroup();
  }

  getAllInstituteBloodGroup() {
    this.loaderService.toggleLoader(true);
    this.bloodGroupManagementService.getAllInstituteBloodGroup().then(res => {
      this.bloodGroups = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, type);
  }
}
