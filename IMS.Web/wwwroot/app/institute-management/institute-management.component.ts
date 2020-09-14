import { Component, OnInit } from '@angular/core';
import { SharedService } from './/../../shared/shared.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../shared/sidenav/sidenav.model';

@Component({
    moduleId: module.id,
    templateUrl: 'institute-management.html'
})
export class InstituteManagementComponent implements OnInit {
  permissions: any[] = [];
  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
    this.sharedService.permission.subscribe(res => {
      this.permissions = res;
    });
  }

  isAllowed(name: string) {
    if (this.permissions.length) {
      var data = this.permissions.find(x => x.userGroupFeatureParent === UserGroupFeatureParentEnum.Administration
        && x.userGroupFeatureChild === UserGroupFeatureChildEnum[name]);
      if (data) {
        return data.canView;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
