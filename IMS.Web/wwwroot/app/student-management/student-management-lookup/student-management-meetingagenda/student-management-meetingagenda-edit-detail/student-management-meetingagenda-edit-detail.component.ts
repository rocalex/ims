import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MeetingAgendaManagementService } from '../student-management-meetingagenda.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../student-management-lookup.model';

@Component({
    moduleId: module.id,
    templateUrl: 'student-management-meetingagenda-edit-detail.html'
})
export class EditAndDetailMeetingAgendaManagementComponent implements OnInit {
    meetingagendaId: number;
    baseModel: BaseModelLookUp = new BaseModelLookUp();
    error: LookUpResponse = new LookUpResponse();
    constructor(private meetingagendaManagementService: MeetingAgendaManagementService, private loaderService: LoaderService,
        private router: Router, private snackBar: SnackbarService) {
    }

    ngOnInit() {
        var path = location.pathname.split('/');
        this.meetingagendaId = +(path[4]);
        this.getInstituteMeetingAgendaDetail();
    }

    getInstituteMeetingAgendaDetail() {
        this.loaderService.toggleLoader(true);
        this.meetingagendaManagementService.getInstituteMeetingAgendaDetail(this.meetingagendaId).then(res => {
            var response = res.json();
            if (response.message) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['student', 'lookup', 'meetingagenda', 'list']);
            } else {
                this.baseModel.Name = response.name;
                this.baseModel.Code = response.code;
                this.baseModel.Description = response.description;
                this.baseModel.Status = response.status;
            }
            this.loaderService.toggleLoader(false);
        })
    }

    updateInstituteMeetingAgenda(updateMeetingAgenda: BaseModelLookUp) {
        this.loaderService.toggleLoader(true);
        var updateData = {
            Name: updateMeetingAgenda.Name, Code: updateMeetingAgenda.Code, MeetingAgendaId: this.meetingagendaId,
            Description: updateMeetingAgenda.Description, Status: updateMeetingAgenda.Status
        }
        this.meetingagendaManagementService.updateInstituteMeetingAgenda(updateData).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['student', 'lookup', 'meetingagenda', 'list']);
                this.snackBar.showSnackbar(response.message);
            } else {
                this.error = new LookUpResponse();
                this.error.ErrorType = response.errorType;
                this.error.HasError = response.hasError;
                this.error.Message = response.message;
            }
            this.loaderService.toggleLoader(false);
        })
    }
}
