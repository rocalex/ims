import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ActivityStatusManagementService } from '../student-management-activitystatus.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../student-management-lookup.model';

@Component({
    moduleId: module.id,
    templateUrl: 'student-management-activitystatus-edit-detail.html'
})
export class EditAndDetailActivityStatusManagementComponent implements OnInit {
    activitystatusId: number;
    baseModel: BaseModelLookUp = new BaseModelLookUp();
    error: LookUpResponse = new LookUpResponse();
    constructor(private activitystatusManagementService: ActivityStatusManagementService, private loaderService: LoaderService,
        private router: Router, private snackBar: SnackbarService) {
    }

    ngOnInit() {
        var path = location.pathname.split('/');
        this.activitystatusId = +(path[4]);
        this.getInstituteActivityStatusDetail();
    }

    getInstituteActivityStatusDetail() {
        this.loaderService.toggleLoader(true);
        this.activitystatusManagementService.getInstituteActivityStatusDetail(this.activitystatusId).then(res => {
            var response = res.json();
            if (response.message) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['student', 'lookup', 'activitystatus', 'list']);
            } else {
                this.baseModel.Name = response.name;
                this.baseModel.Code = response.code;
                this.baseModel.Description = response.description;
                this.baseModel.Status = response.status;
            }
            this.loaderService.toggleLoader(false);
        })
    }

    updateInstituteActivityStatus(updateActivityStatus: BaseModelLookUp) {
        this.loaderService.toggleLoader(true);
        var updateData = {
            Name: updateActivityStatus.Name, Code: updateActivityStatus.Code, ActivityStatusId: this.activitystatusId,
            Description: updateActivityStatus.Description, Status: updateActivityStatus.Status
        }
        this.activitystatusManagementService.updateInstituteActivityStatus(updateData).then(res => {
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
