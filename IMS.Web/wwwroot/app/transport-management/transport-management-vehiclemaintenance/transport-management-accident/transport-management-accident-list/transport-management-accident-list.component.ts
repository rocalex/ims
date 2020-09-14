import { Component, OnInit } from '@angular/core';
import { TransportManagementAccidentService } from '../transport-management-accident.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureChildEnum, UserGroupFeatureParentEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-accident-list.html'
})
export class ListTransportManagementAccidentComponent implements OnInit {
  accidents: any[] = [];
  constructor(private transportManagementAccidentService: TransportManagementAccidentService,
    private loaderService: LoaderService, private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAccidents();
  }

  getAccidents() {
    this.loaderService.toggleLoader(true);
    this.transportManagementAccidentService.getAccidents().then(res => {
      this.accidents = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Transportation, UserGroupFeatureChildEnum.TransportVehicleAccident, type);
  }
}
