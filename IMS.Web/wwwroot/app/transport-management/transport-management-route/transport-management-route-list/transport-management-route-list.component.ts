import { Component, OnInit } from '@angular/core';
import { RouteService } from '../transport-management-route.service';
import { LoaderService } from '../../../../shared/loader-service';
import { UserGroupFeatureChildEnum, UserGroupFeatureParentEnum } from '../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-route-list.html'
})
export class ListTransportManagementRouteComponent implements OnInit {
  routes: any[] = [];
  constructor(private routeService: RouteService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getRoutes();
  }

  getRoutes() {
    this.loaderService.toggleLoader(true);
    this.routeService.getRoutes().then(res => {
      this.routes = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Transportation, UserGroupFeatureChildEnum.TransportRoute, type);
  }
}
