import { Component, OnInit } from '@angular/core';
import { GenderManagementService } from '../student-management-gender.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-gender-list.html'
})
export class ListGenderManagementComponent implements OnInit {
  genders: any[] = [];
  constructor(private genderManagementService: GenderManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllInstituteGender();
  }

  getAllInstituteGender() {
    this.loaderService.toggleLoader(true);
    this.genderManagementService.getAllInstituteGender().then(res => {
      this.genders = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, type);
  }
}
