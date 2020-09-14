import { Component, OnInit } from '@angular/core';
import { StudentRouteMappingService } from '../transport-management-studentroutemapping.service';
import { LoaderService } from '../../../../shared/loader-service';
import { UserGroupFeatureChildEnum, UserGroupFeatureParentEnum } from '../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-studentroutemapping-list.html'
})
export class ListTransportManagementStudentRouteMappingComponent implements OnInit {
  routes: any[] = [];
  constructor(private studentRouteMappingService: StudentRouteMappingService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getRoutes();
  }

  getRoutes() {
    this.loaderService.toggleLoader(true);
    this.studentRouteMappingService.getRoutes().then(res => {
      this.routes = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Transportation, UserGroupFeatureChildEnum.TransportStudentRouteMapping, type);
  }
}
