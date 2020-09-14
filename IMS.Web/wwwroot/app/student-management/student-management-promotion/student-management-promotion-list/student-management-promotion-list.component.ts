import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoaderService } from '../../../../shared/loader-service';
import { StudentPromotionManagementService } from '../student-management-promotion.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-promotion-list.html'
})
export class ListStudentPromotionManagementComponent implements OnInit {
  students: any[] = [];
  constructor(private studentManagementService: StudentPromotionManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllStudentByInsituteId();
  }

  getAllStudentByInsituteId() {
    this.loaderService.toggleLoader(true);
    this.studentManagementService.getAllStudentByInsituteId().then(res => {
      this.students = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentPromotion, type);
  }
}
