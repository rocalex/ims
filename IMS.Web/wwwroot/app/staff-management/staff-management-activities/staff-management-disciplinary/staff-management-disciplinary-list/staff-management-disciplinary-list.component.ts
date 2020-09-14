import { Component, OnInit } from '@angular/core';
import { StaffDisciplinaryManagementService } from '../staff-management-disciplinary.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'staff-management-disciplinary-list.html'
})
export class ListStaffDisciplinaryManagementComponent implements OnInit {
  disciplinaries: any[] = [];
  constructor(private staffDisciplinaryManagementService: StaffDisciplinaryManagementService,
    private loaderService: LoaderService, private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getDisciplinaries();
  }

  getDisciplinaries() {
    this.loaderService.toggleLoader(true);
    this.staffDisciplinaryManagementService.getDisciplinaries().then(res => {
      this.disciplinaries = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Staff, UserGroupFeatureChildEnum.Disciplinary, type);
  }
}
