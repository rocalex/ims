import { Component, OnInit } from '@angular/core';
import { LanguageManagementService } from '../student-management-language.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-language-list.html'
})
export class ListLanguageManagementComponent implements OnInit {
  languages: any[] = [];
  constructor(private languageManagementService: LanguageManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllInstituteLanguage();
  }

  getAllInstituteLanguage() {
    this.loaderService.toggleLoader(true);
    this.languageManagementService.getAllInstituteLanguage().then(res => {
      this.languages = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, type);
  }
}
