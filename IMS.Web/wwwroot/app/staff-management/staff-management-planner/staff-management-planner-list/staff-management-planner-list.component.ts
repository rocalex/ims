import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../../shared/loader-service';
import { StaffPlannerManagementService } from '../staff-management-planner.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../shared/permission.service';

@Component({
    moduleId: module.id,
    templateUrl: 'staff-management-planner-list.html'
})
export class ListStaffPlannerManagementComponent implements OnInit {

    plans: any[] = [];

  constructor(private staffPlannerManagementService: StaffPlannerManagementService,
    private loaderService: LoaderService, private permissionService: PermissionService) { }

    ngOnInit() {
        this.getStaffPlansList();
    }

    // Method for fetching the list of all staff plans
    getStaffPlansList() {
        this.loaderService.toggleLoader(true);
        this.staffPlannerManagementService.getAllStaffPlans()
            .then(res => {
                this.plans = res.json();
                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                console.log(err.json());
                this.loaderService.toggleLoader(false);
            });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Staff, UserGroupFeatureChildEnum.StaffPlanner, type);
  }
}
