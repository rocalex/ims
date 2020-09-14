import { Component, OnInit } from '@angular/core';
import { TransportManagementMaintenanceService } from '../transport-management-maintenance.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureChildEnum, UserGroupFeatureParentEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-maintenance-list.html'
})
export class ListTransportManagementMaintenanceComponent implements OnInit {
  maintenances: any[] = [];
  constructor(private transportManagementMaintenanceService: TransportManagementMaintenanceService,
    private loaderService: LoaderService, private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getMaintenances();
  }

  getMaintenances() {
    this.loaderService.toggleLoader(true);
    this.transportManagementMaintenanceService.getMaintenances().then(res => {
      this.maintenances = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Transportation, UserGroupFeatureChildEnum.TransportVehicleMaintanence, type);
  }
}
