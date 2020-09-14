import { Component, OnInit } from '@angular/core';

// Services
import { AcademicYearManagementService } from '../institute-management-academic-year.service';
import { LoaderService } from '../../../../shared/loader-service';
import { PermissionService } from '../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';

@Component({
    moduleId: module.id,
    templateUrl: 'institute-management-academic-year-list.html'
})
export class ListAcademicYearManagementComponent implements OnInit {

    academicYears: any[] = [];

  constructor(private academicYearManagementService: AcademicYearManagementService, private permissionService: PermissionService,
        private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.getInstituteAcademicYearsList();
    }

    getInstituteAcademicYearsList() {
        this.loaderService.toggleLoader(true);

        this.academicYearManagementService.getInstituteAcademicYearsList()
            .then((res) => {
                this.academicYears = res.json();
                this.loaderService.toggleLoader(false);
            })
            .catch((err) => {
                console.log(err.json());
                this.loaderService.toggleLoader(false);
            });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Administration, UserGroupFeatureChildEnum.InstituteAcademicYear, type);
  }
}
