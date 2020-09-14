import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../../../shared/loader-service';
import { StaffActivityManagementService } from '../staff-management-activity.service';
import { UserGroupFeatureChildEnum, UserGroupFeatureParentEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
    moduleId: module.id,
    templateUrl: 'staff-management-activity-list.html'
})
export class ListStaffActivityManagementComponent implements OnInit {

    activities: any[] = [];

  constructor(private staffActivityManagementService: StaffActivityManagementService,
    private loaderService: LoaderService, private permissionService: PermissionService) { }

    ngOnInit() {
        this.getStaffActivitiesList();
    }

    // Method for fetching the list of all staff activities
    getStaffActivitiesList() {
        this.loaderService.toggleLoader(true);
        this.staffActivityManagementService.getAllActivities()
            .then(res => {
                this.activities = res.json();
                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                console.log(err.json());
                this.loaderService.toggleLoader(false);
            });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Staff, UserGroupFeatureChildEnum.StaffActivity, type);
  }
}
