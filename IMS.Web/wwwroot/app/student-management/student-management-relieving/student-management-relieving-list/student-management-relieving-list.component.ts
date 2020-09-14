import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoaderService } from '../../../../shared/loader-service';
import { StudentRelievingManagementService } from '../student-management-relieving.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-relieving-list.html'
})
export class ListStudentRelievingManagementComponent implements OnInit {
  students: any[] = [];
  constructor(private studentManagementService: StudentRelievingManagementService, private loaderService: LoaderService,
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
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentRelieving, type);
  }
}
