import { Component, OnInit } from '@angular/core';
import { StageService } from '../transport-management-stage.service';
import { LoaderService } from '../../../../shared/loader-service';
import { UserGroupFeatureChildEnum, UserGroupFeatureParentEnum } from '../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-stage-list.html'
})
export class ListTransportManagementStageComponent implements OnInit {
  stages: any[] = [];
  constructor(private stageService: StageService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getStages();
  }

  getStages() {
    this.loaderService.toggleLoader(true);
    this.stageService.getStages().then(res => {
      this.stages = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Transportation, UserGroupFeatureChildEnum.TransportStage, type);
  }
}
