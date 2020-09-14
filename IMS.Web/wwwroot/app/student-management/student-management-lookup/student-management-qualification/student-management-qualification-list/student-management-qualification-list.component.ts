import { Component, OnInit } from '@angular/core';
import { QualificationManagementService } from '../student-management-qualification.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-qualification-list.html'
})
export class ListQualificationManagementComponent implements OnInit {
  qualifications: any[] = [];
  constructor(private qualificationManagementService: QualificationManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllInstituteQualification();
  }

  getAllInstituteQualification() {
    this.loaderService.toggleLoader(true);
    this.qualificationManagementService.getAllInstituteQualification().then(res => {
      this.qualifications = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, type);
  }
}
