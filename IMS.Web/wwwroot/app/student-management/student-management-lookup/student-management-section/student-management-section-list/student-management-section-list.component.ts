import { Component, OnInit } from '@angular/core';
import { SectionManagementService } from '../student-management-section.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-section-list.html'
})
export class ListSectionManagementComponent implements OnInit {
  sections: any[] = [];
  constructor(private sectionManagementService: SectionManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllInstituteSection();
  }

  getAllInstituteSection() {
    this.loaderService.toggleLoader(true);
    this.sectionManagementService.getAllInstituteSection().then(res => {
      this.sections = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, type);
  }
}
