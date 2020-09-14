import { Component, OnInit } from '@angular/core';

import { ActivityStatusManagementService } from '../student-management-activitystatus.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
    moduleId: module.id,
    templateUrl: 'student-management-activitystatus-list.html'
})
export class ListActivityStatusManagementComponent implements OnInit {
    activitystatuss: any[] = [];
  constructor(private activitystatusManagementService: ActivityStatusManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
    }

    ngOnInit() {
        this.getAllInstituteActivityStatus();
    }

    getAllInstituteActivityStatus() {
        this.loaderService.toggleLoader(true);
        this.activitystatusManagementService.getAllInstituteActivityStatus().then(res => {
            this.activitystatuss = res.json();
            this.loaderService.toggleLoader(false);
        })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, type);
  }
}
