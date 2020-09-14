import { Component, OnInit } from '@angular/core';
import { DisciplinaryStatusManagementService } from '../student-management-disciplinarystatus.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-disciplinarystatus-list.html'
})
export class ListDisciplinaryStatusManagementComponent implements OnInit {
  DisciplinaryStatuss: any[] = [];
  constructor(private DisciplinaryStatusManagementService: DisciplinaryStatusManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllInstituteDisciplinaryStatus();
  }

  getAllInstituteDisciplinaryStatus() {
    this.loaderService.toggleLoader(true);
    this.DisciplinaryStatusManagementService.getAllInstituteDisciplinaryStatus().then(res => {
      this.DisciplinaryStatuss = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, type);
  }
}
