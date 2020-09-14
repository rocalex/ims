import { Component, OnInit } from '@angular/core';
import { UserGroupFeatureManagementService } from '../user-group-feature-management.service';
import { LoaderService } from '../../../../shared/loader-service';
import { UserGroupFeatureChildEnum, UserGroupFeatureParentEnum } from '../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'user-group-feature-management-list.html'
})
export class ListUserGroupFeatureManagementComponent implements OnInit {
  userGroups: any[] = [];
  constructor(private userGroupFeatureManagementService: UserGroupFeatureManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllUserGroups();
  }

  getAllUserGroups() {
    this.loaderService.toggleLoader(true);
    this.userGroupFeatureManagementService.getAllUserGroups().then(res => {
      this.userGroups = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Administration, UserGroupFeatureChildEnum.UserManagementPermission, type);
  }
}
