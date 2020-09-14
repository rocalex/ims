import { Component, OnInit } from '@angular/core';
import { ReligionManagementService } from '../student-management-religion.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-religion-list.html'
})
export class ListReligionManagementComponent implements OnInit {
  religions: any[] = [];
  constructor(private religionManagementService: ReligionManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllInstituteReligion();
  }

  getAllInstituteReligion() {
    this.loaderService.toggleLoader(true);
    this.religionManagementService.getAllInstituteReligion().then(res => {
      this.religions = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, type);
  }
}
