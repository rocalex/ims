import { Component, OnInit } from '@angular/core';
import { MaritalStatusManagementService } from '../student-management-maritalstatus.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-maritalstatus-list.html'
})
export class ListMaritalStatusManagementComponent implements OnInit {
  maritalStatuses: any[] = [];
  constructor(private maritalStatusManagementService: MaritalStatusManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllInstituteMaritalStatus();
  }

  getAllInstituteMaritalStatus() {
    this.loaderService.toggleLoader(true);
    this.maritalStatusManagementService.getAllInstituteMaritalStatus().then(res => {
      this.maritalStatuses = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, type);
  }
}
