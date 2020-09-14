import { Component, OnInit } from '@angular/core';
import { LevelManagementService } from '../student-management-level.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-level-list.html'
})
export class ListLevelManagementComponent implements OnInit {
  levels: any[] = [];
  constructor(private levelManagementService: LevelManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllInstituteLevel();
  }

  getAllInstituteLevel() {
    this.loaderService.toggleLoader(true);
    this.levelManagementService.getAllInstituteLevel().then(res => {
      this.levels = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, type);
  }
}
