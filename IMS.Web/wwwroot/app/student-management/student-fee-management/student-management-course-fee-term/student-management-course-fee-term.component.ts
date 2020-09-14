import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../../shared/loader-service';
import { CourseFeeTermsManagementService } from './student-management-course-fee-term.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../shared/permission.service';

@Component({
    moduleId: module.id,
    templateUrl: 'student-management-course-fee-term.html'
})
export class CourseFeeTermManagementComponent implements OnInit {

    classesList: any[] = [];

  constructor(private loaderService: LoaderService, private permissionService: PermissionService,
        private courseFeeTermsManagementService: CourseFeeTermsManagementService) { }

    ngOnInit() {
        this.getInstituteClassList();
    }

    getInstituteClassList() {
        this.loaderService.toggleLoader(true);
        this.courseFeeTermsManagementService.getInstituteClassList()
            .then(res => {
                this.classesList = res.json();
                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentCourseFeeTerm, type);
  }
}
