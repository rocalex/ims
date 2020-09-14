import { Component, OnInit } from '@angular/core';

// Import services
import { UserGroupManagementService } from '../user-group-management.service';
import { LoaderService } from '../../../../shared/loader-service';
import { UserGroupFeatureChildEnum, UserGroupFeatureParentEnum } from '../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../shared/permission.service';

@Component({
    moduleId: module.id,
    templateUrl: 'user-group-management-list.html'
})
export class UserGroupManagementListComponent implements OnInit {

    userGroupList: any[] = [];

  constructor(private userGroupManagementService: UserGroupManagementService, private permissionService: PermissionService,
        private loader: LoaderService) { }

    ngOnInit() {
        this.getUserGroupList();
    }

    // Method for fetching the list of all user groups
    getUserGroupList() {
        this.loader.toggleLoader(true);
        this.userGroupManagementService.getAllUserGroups()
            .then((res) => {
                this.userGroupList = res.json();
                this.loader.toggleLoader(false);
            })
            .catch((err) => {
                console.log(err.json());
                this.loader.toggleLoader(false);
            });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Administration, UserGroupFeatureChildEnum.UserManagementRole, type);
  }
}
