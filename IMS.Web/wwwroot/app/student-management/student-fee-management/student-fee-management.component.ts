import { Component, OnInit } from '@angular/core';

import * as FeeManagementLookupModel from './student-fee-management.model';
import { SharedService } from '../../../shared/shared.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-fee-management.html'
})
export class StudentFeeManagementComponent implements OnInit {
  feeManagementLookUps: FeeManagementLookupModel.FeeManagementLookUpModel[] = FeeManagementLookupModel.FeeManagementLookUps();
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
      var data = this.permissions.find(x => x.userGroupFeatureParent === UserGroupFeatureParentEnum.Student
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
