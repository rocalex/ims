import { Component, OnInit } from '@angular/core';
import { VehicleMasterService } from '../transport-management-vehiclemaster.service';
import { LoaderService } from '../../../../shared/loader-service';
import { UserGroupFeatureChildEnum, UserGroupFeatureParentEnum } from '../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-vehiclemaster-list.html'
})
export class ListTransportManagementVehicleMasterComponent implements OnInit {
  vehicles: any[] = [];
  constructor(private vehicleMasterService: VehicleMasterService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getVehicleMasters();
  }

  getVehicleMasters() {
    this.loaderService.toggleLoader(true);
    this.vehicleMasterService.getVehicleMasters().then(res => {
      this.vehicles = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Transportation, UserGroupFeatureChildEnum.TransportVehicle, type);
  }
}
