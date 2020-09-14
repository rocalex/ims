import { Component, OnInit } from '@angular/core';
import { StaffDesignationManagementService } from '../staff-management-designation.service';
import { LoaderService } from '../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../shared/permission.service';

@Component({
    moduleId: module.id,
    templateUrl: 'staff-management-designation-list.html'
})
export class ListDesignationManagementComponent implements OnInit {

    designations: any[] = [];

    constructor(private staffDesignationManagementService: StaffDesignationManagementService,
      private loaderService: LoaderService, private permissionService: PermissionService) {
    }

    ngOnInit() {
        this.getAllDesignations();
    }

    getAllDesignations() {
        this.loaderService.toggleLoader(true);
        this.staffDesignationManagementService.getAllDesignations()
            .then((res) => {
                this.designations = res.json();
                this.loaderService.toggleLoader(false);
            })
            .catch((err) => {
                console.log(err.json());
                this.loaderService.toggleLoader(false);
            })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Staff, UserGroupFeatureChildEnum.StaffDesignation, type);
  }
}
