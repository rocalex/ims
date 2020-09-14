import { Component, OnInit } from '@angular/core';
import { StateManagementService } from '../state-management.service';
import { LoaderService } from '../../../../shared/loader-service';
import { PermissionService } from '../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';

@Component({
  moduleId: module.id,
  templateUrl: 'state-management-list.html'
})
export class ListStateManagementComponent implements OnInit {
  states: any[] = [];
  constructor(private stateManagementService: StateManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.loaderService.toggleLoader(true);
    this.getAllStates();
  }

  getAllStates() {
    this.stateManagementService.getAllStates().then(res => {
      this.states = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Administration, UserGroupFeatureChildEnum.AcademicState, type);
  }
}
