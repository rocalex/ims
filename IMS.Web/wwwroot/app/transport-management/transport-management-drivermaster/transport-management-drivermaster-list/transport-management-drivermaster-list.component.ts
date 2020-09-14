import { Component, OnInit } from '@angular/core';
import { DriverMasterService } from '../transport-management-drivermaster.service';
import { LoaderService } from '../../../../shared/loader-service';
import { UserGroupFeatureChildEnum, UserGroupFeatureParentEnum } from '../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-drivermaster-list.html'
})
export class ListTransportManagementDriverMasterComponent implements OnInit {
  drivers: any[] = [];
  constructor(private driverMasterService: DriverMasterService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getDriverMasters();
  }

  getDriverMasters() {
    this.loaderService.toggleLoader(true);
    this.driverMasterService.getDriverMasters().then(res => {
      this.drivers = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Transportation, UserGroupFeatureChildEnum.TransportDriver, type);
  }
}
