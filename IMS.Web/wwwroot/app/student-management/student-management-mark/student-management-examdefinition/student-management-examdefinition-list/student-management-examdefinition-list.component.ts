import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../../shared/loader-service';
import { StudentManagementExamDefinitionService } from '../student-management-examdefinition.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-examdefinition-list.html'
})
export class ListStudentManagementExamDefinitionComponent implements OnInit {
  examDefinitions: any[] = [];
  constructor(private studentManagementExamDefinitionService: StudentManagementExamDefinitionService,
    private loaderService: LoaderService, private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllInstituteGender();
  }

  getAllInstituteGender() {
    this.loaderService.toggleLoader(true);
    this.studentManagementExamDefinitionService.getAllInstituteExamDefinition().then(res => {
      this.examDefinitions = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentMarkExamDefinition, type);
  }
}
