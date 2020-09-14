import { Component, OnInit } from '@angular/core';
import { ReligionCategoryManagementService } from '../student-management-religion-category.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-religion-category-list.html'
})
export class ListReligionCategoryManagementComponent implements OnInit {
  religionCategorys: any[] = [];
  constructor(private religionCategoryManagementService: ReligionCategoryManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllInstituteReligionCategory();
  }

  getAllInstituteReligionCategory() {
    this.loaderService.toggleLoader(true);
    this.religionCategoryManagementService.getAllInstituteReligionCategory().then(res => {
      this.religionCategorys = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, type);
  }
}
