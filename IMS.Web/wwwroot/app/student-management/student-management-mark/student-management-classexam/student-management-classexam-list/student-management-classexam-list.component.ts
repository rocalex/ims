import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../../shared/loader-service';
import { StudentManagementClassExamService } from '../student-management-classexam.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-classexam-list.html'
})
export class ListStudentManagementClassExamComponent implements OnInit {
  classExams: any[] = [];
  constructor(private studentManagementClassExamService: StudentManagementClassExamService,
    private loaderService: LoaderService, private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllClassExams();
  }

  getAllClassExams() {
    this.loaderService.toggleLoader(true);
    this.studentManagementClassExamService.getAllClassExams().then(res => {
      this.classExams = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentMarkClassExam, type);
  }
}
