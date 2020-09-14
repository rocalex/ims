import { Component, OnInit } from '@angular/core';
import { SubjectManagementService } from '../institute-management-subject.service';
import { LoaderService } from '../../../../shared/loader-service';
import { UserGroupFeatureChildEnum, UserGroupFeatureParentEnum } from '../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'institute-management-subject-list.html'
})
export class ListSubjectManagementComponent implements OnInit {
  subjectes: any = [];
  constructor(private subjectManagementService: SubjectManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getInstituteInstituteSubjectsList();
  }

  getInstituteInstituteSubjectsList() {
    this.loaderService.toggleLoader(true);
    this.subjectManagementService.getInstituteInstituteSubjectsList().then(res => {
      this.subjectes = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Administration, UserGroupFeatureChildEnum.InstituteSubject, type);
  }
}
