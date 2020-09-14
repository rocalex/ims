import { Component, OnInit } from '@angular/core';
import { OccupationManagementService } from '../student-management-occupation.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-Occupation-list.html'
})
export class ListOccupationManagementComponent implements OnInit {
  occupations: any[] = [];
  constructor(private occupationManagementService: OccupationManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllInstituteOccupation();
  }

  getAllInstituteOccupation() {
    this.loaderService.toggleLoader(true);
    this.occupationManagementService.getAllInstituteOccupation().then(res => {
      this.occupations = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, type);
  }
}
