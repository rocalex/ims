import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-vehiclemaintenance.html'
})
export class TransportManagementVehicleMaintenanceComponent implements OnInit {
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
      var data = this.permissions.find(x => x.userGroupFeatureParent === UserGroupFeatureParentEnum.Transportation
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
