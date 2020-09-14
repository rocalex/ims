import { Component, OnInit } from '@angular/core';
import { ClassManagementService } from '../institute-management-class.service';
import { LoaderService } from '../../../../shared/loader-service';
import { InstituteClassDurationUnitEnum } from '../institute-management-class.model';
import { PermissionService } from '../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';

@Component({
  moduleId: module.id,
  templateUrl: 'institute-management-class-list.html'
})
export class ListClassManagementComponent implements OnInit {
  classes: any = [];
  instituteClassDurationUnitEnum = InstituteClassDurationUnitEnum;
  constructor(private classManagementService: ClassManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getInstituteInstituteClasssList();
  }

  getInstituteInstituteClasssList() {
    this.loaderService.toggleLoader(true);
    this.classManagementService.getInstituteInstituteClasssList().then(res => {
      this.classes = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Administration, UserGroupFeatureChildEnum.InstituteClass, type);
  }
}
