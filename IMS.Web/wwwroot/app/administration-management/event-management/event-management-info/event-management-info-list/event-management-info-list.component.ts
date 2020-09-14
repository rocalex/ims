import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../../../shared/loader-service';
import { EventManagementService } from '../event-management-info.service';

import { EventManagementInfoModel, EventManagementInfoPriorityEnum } from '../../event-management.model';
import { PermissionService } from '../../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';

@Component({
  moduleId: module.id,
  templateUrl: 'event-management-info-list.html'
})
export class ListEventManagementComponent implements OnInit {

  eventInfoList: EventManagementInfoModel[] = [];
  eventInfoPriorityEnumDetails: any[] = [
    { key: EventManagementInfoPriorityEnum.High, value: 'High' },
    { key: EventManagementInfoPriorityEnum.Medium, value: 'Medium' },
    { key: EventManagementInfoPriorityEnum.Low, value: 'Low' }
  ];

  constructor(private loaderService: LoaderService, private permissionService: PermissionService,
        private eventManagementService: EventManagementService) { }

  ngOnInit() {
    this.getEventInfoList();
  }

  getEventInfoList() {
    this.loaderService.toggleLoader(true);
    this.eventManagementService.getEventInfoList()
      .then(res => {
        this.eventInfoList = res.json();
        this.eventInfoList.forEach(eventInfo => {
          eventInfo.priorityName = this.eventInfoPriorityEnumDetails.filter(x => x.key == eventInfo.priority)[0].value;
        });

        this.loaderService.toggleLoader(false);
      })
      .catch(err => {
        this.loaderService.toggleLoader(false);
      });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Administration, UserGroupFeatureChildEnum.AcademicEvent, type);
  }
}
