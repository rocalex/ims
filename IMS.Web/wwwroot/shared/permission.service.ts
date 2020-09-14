import { Injectable } from '@angular/core';
import { UserGroupFeatureChildEnum, UserGroupFeatureParentEnum } from './sidenav/sidenav.model';
import { SharedService } from './shared.service';

@Injectable()
export class PermissionService {
  permissions: any[] = [];
  constructor(private sharedService: SharedService) {
    this.sharedService.permission.subscribe(res => {
      this.permissions = res;
    });
  }

  isAllowed(parent: UserGroupFeatureParentEnum, child: UserGroupFeatureChildEnum, type: string): boolean {
    var permissionType = PermissionType[type];
    var permission = this.permissions.find(x => x.userGroupFeatureChild === child && x.userGroupFeatureParent === parent);
    if (permission) {
      switch (permissionType) {
        case PermissionType.Add: {
          return permission.canAdd;
        }
        case PermissionType.Delete: {
          return permission.canDelete;
        }
        case PermissionType.Edit: {
          return permission.canEdit;
        }
        default: {
          return false;
        }
      }
    } else {
      return false;
    }
  }
}

export enum PermissionType {
  Add,
  Edit,
  Delete
}