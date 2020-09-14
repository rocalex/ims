import { Component, OnInit } from '@angular/core';
import { ActivityStatusManagementService } from '../student-management-activitystatus.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../student-management-lookup.model';

@Component({
    moduleId: module.id,
    templateUrl: 'student-management-activitystatus-add.html'
})
export class AddActivityStatusManagementComponent implements OnInit {
    baseModel: BaseModelLookUp = new BaseModelLookUp();
    error: LookUpResponse = new LookUpResponse();
    constructor(private activitystatusManagementService: ActivityStatusManagementService, private loaderService: LoaderService,
        private router: Router, private snackBar: SnackbarService) {
    }

    ngOnInit() {
    }

    addInstituteActivityStatus(addActivityStatus: BaseModelLookUp) {
        this.loaderService.toggleLoader(true);
        this.activitystatusManagementService.addInstituteActivityStatus(addActivityStatus).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['student', 'lookup', 'activitystatus', 'list']);
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
