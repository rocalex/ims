import { Component, OnInit } from '@angular/core';
import { MeetingAgendaManagementService } from '../student-management-meetingagenda.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../student-management-lookup.model';

@Component({
    moduleId: module.id,
    templateUrl: 'student-management-meetingagenda-add.html'
})
export class AddMeetingAgendaManagementComponent implements OnInit {
    baseModel: BaseModelLookUp = new BaseModelLookUp();
    error: LookUpResponse = new LookUpResponse();
    constructor(private meetingagendaManagementService: MeetingAgendaManagementService, private loaderService: LoaderService,
        private router: Router, private snackBar: SnackbarService) {
    }

    ngOnInit() {
    }

    addInstituteMeetingAgenda(addMeetingAgenda: BaseModelLookUp) {
        this.loaderService.toggleLoader(true);
        this.meetingagendaManagementService.addInstituteMeetingAgenda(addMeetingAgenda).then(res => {
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
