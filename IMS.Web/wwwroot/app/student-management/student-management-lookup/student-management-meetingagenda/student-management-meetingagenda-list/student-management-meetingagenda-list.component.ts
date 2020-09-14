import { Component, OnInit } from '@angular/core';

import { MeetingAgendaManagementService } from '../student-management-meetingagenda.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
    moduleId: module.id,
    templateUrl: 'student-management-meetingagenda-list.html'
})
export class ListMeetingAgendaManagementComponent implements OnInit {
    meetingagendas: any[] = [];
  constructor(private meetingagendaManagementService: MeetingAgendaManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
    }

    ngOnInit() {
        this.getAllInstituteMeetingAgenda();
    }

    getAllInstituteMeetingAgenda() {
        this.loaderService.toggleLoader(true);
        this.meetingagendaManagementService.getAllInstituteMeetingAgenda().then(res => {
            this.meetingagendas = res.json();
            this.loaderService.toggleLoader(false);
        })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, type);
  }
}
