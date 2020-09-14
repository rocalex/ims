import { Component, OnInit } from '@angular/core';
import { VehicleDriverMappingService } from '../transport-management-vehicledrivermapping.service';
import { LoaderService } from '../../../../shared/loader-service';
import { UserGroupFeatureChildEnum, UserGroupFeatureParentEnum } from '../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-vehicledrivermapping-list.html'
})
export class ListTransportManagementVehicleDriverMappingComponent implements OnInit {
  vehicles: any[] = [];
  constructor(private vehicleDriverService: VehicleDriverMappingService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getVehicleMasters();
  }

  getVehicleMasters() {
    this.loaderService.toggleLoader(true);
    this.vehicleDriverService.getVehicleMasters().then(res => {
      this.vehicles = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Transportation, UserGroupFeatureChildEnum.TransportVehicleDriverMapping, type);
  }
}
