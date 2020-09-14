import { Component, OnInit } from '@angular/core';
import { TransportManagementRepairService } from '../transport-management-repair.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-repair-list.html'
})
export class ListTransportManagementRepairComponent implements OnInit {
  repairs: any[] = [];
  constructor(private transportManagementRepairService: TransportManagementRepairService,
    private loaderService: LoaderService, private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getRepairs();
  }

  getRepairs() {
    this.loaderService.toggleLoader(true);
    this.transportManagementRepairService.getRepairs().then(res => {
      this.repairs = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Transportation, UserGroupFeatureChildEnum.TransportVehicleRepair, type);
  }
}
