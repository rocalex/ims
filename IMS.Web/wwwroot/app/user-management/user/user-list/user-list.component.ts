import { Component, OnInit } from '@angular/core';

// Import services
import { UserService } from '../user.service';
import { LoaderService } from '../../../../shared/loader-service';
import { UserGroupFeatureChildEnum, UserGroupFeatureParentEnum } from '../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../shared/permission.service';

@Component({
    moduleId: module.id,
    templateUrl: 'user-list.html'
})
export class UserListComponent implements OnInit {

    usersList: any[] = [];

  constructor(private userService: UserService, private permissionService: PermissionService,
        private loader: LoaderService) { }

    ngOnInit() {
        this.getUsersList();
    }

    // Method for fetching the list of all users
    getUsersList() {
        this.loader.toggleLoader(true);
        this.userService.getAllUsers()
            .then((res) => {
                this.usersList = res.json();
                this.loader.toggleLoader(false);
            })
            .catch((err) => {
                console.log(err.json());
                this.loader.toggleLoader(true);
            });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Administration, UserGroupFeatureChildEnum.UserManagementUsers, type);
  }
}
