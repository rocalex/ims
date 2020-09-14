import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { StudentManagementService } from '../student-management-information.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../shared/permission.service';
import { ClassModel } from '../student-management-information.model';

@Component({
  moduleId: module.id,
  templateUrl: 'classlist.component.html'
})
export class ClassListComponent implements OnInit {
    classList: ClassModel[] = [];
  constructor(private studentManagementService: StudentManagementService,
    private loaderService: LoaderService, private permissionService: PermissionService,
    private snackbarService: SnackbarService) {
  }

  ngOnInit() {
      this.getAllStudentByInsituteId();
  }

  getAllStudentByInsituteId() {
    this.loaderService.toggleLoader(true);
      this.studentManagementService.getClassList().then(res => {
          console.log(res);
      this.classList = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentInfo, type);
  }
}
