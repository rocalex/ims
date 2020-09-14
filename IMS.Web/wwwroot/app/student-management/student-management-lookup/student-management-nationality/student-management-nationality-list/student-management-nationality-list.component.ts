import { Component, OnInit } from '@angular/core';
import { NationalityManagementService } from '../student-management-nationality.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
    moduleId: module.id,
    templateUrl: 'student-management-nationality-list.html'
})
export class ListNationalityManagementComponent implements OnInit {
    nationalities: any[] = [];
  constructor(private nationalityManagementService: NationalityManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
    }

    ngOnInit() {
        this.getAllInstituteNationality();
    }

    getAllInstituteNationality() {
        this.loaderService.toggleLoader(true);
        this.nationalityManagementService.getAllInstituteNationality().then(res => {
            this.nationalities = res.json();
            this.loaderService.toggleLoader(false);
        })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, type);
  }
}
