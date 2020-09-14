import { Component, OnInit } from '@angular/core';
import { SportDetailManagementService } from '../student-management-sport-detail.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-sport-detail-list.html'
})
export class ListSportDetailManagementComponent implements OnInit {
  sportDetails: any[] = [];
  constructor(private sportDetailManagementService: SportDetailManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllInstituteSportDetail();
  }

  getAllInstituteSportDetail() {
    this.loaderService.toggleLoader(true);
    this.sportDetailManagementService.getAllInstituteSportDetail().then(res => {
      this.sportDetails = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, type);
  }
}
