import { Component, OnInit } from '@angular/core';
import { CasteManagementService } from '../student-management-caste.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-caste-list.html'
})
export class ListCasteManagementComponent implements OnInit {
  castes: any[] = [];
  constructor(private casteManagementService: CasteManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllInstituteCaste();
  }

  getAllInstituteCaste() {
    this.loaderService.toggleLoader(true);
    this.casteManagementService.getAllInstituteCaste().then(res => {
      this.castes = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, type);
  }
}
