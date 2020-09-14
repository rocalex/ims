import { Component, OnInit } from '@angular/core';
import { MotherTongueManagementService } from '../student-management-mother-tongue.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
    moduleId: module.id,
    templateUrl: 'student-management-mother-tongue-list.html'
})
export class ListMotherTongueManagementComponent implements OnInit {

    motherTongues: any[] = [];

    constructor(private motherTongueManagementService: MotherTongueManagementService,
      private loaderService: LoaderService, private permissionService: PermissionService) {
    }

    ngOnInit() {
        this.getAllMotherTongues();
    }

    getAllMotherTongues() {
        this.loaderService.toggleLoader(true);
        this.motherTongueManagementService.getAllMotherTongues()
            .then((res) => {
                this.motherTongues = res.json();
                this.loaderService.toggleLoader(false);
            })
            .catch((err) => {
                console.log(err.json());
                this.loaderService.toggleLoader(false);
            })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, type);
  }
}
