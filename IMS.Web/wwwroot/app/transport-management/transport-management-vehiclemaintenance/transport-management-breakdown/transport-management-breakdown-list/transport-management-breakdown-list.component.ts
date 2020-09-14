import { Component, OnInit } from '@angular/core';
import { TransportManagementBreakDownService } from '../transport-management-breakdown.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureChildEnum, UserGroupFeatureParentEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-breakdown-list.html'
})
export class ListTransportManagementBreakDownComponent implements OnInit {
  breakDowns: any[] = [];
  constructor(private transportManagementBreakDownService: TransportManagementBreakDownService,
    private loaderService: LoaderService, private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getBreakDowns();
  }

  getBreakDowns() {
    this.loaderService.toggleLoader(true);
    this.transportManagementBreakDownService.getBreakDowns().then(res => {
      this.breakDowns = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Transportation, UserGroupFeatureChildEnum.TransportVehicleBreakDown, type);
  }
}
