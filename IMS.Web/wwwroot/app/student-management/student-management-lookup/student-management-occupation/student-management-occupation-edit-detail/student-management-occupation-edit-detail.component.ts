import { Component, OnInit } from '@angular/core';
import { OccupationManagementService } from '../student-management-occupation.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../student-management-lookup.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-occupation-edit-detail.html'
})
export class EditAndDetailOccupationManagementComponent implements OnInit {
  occupationId: number;
  baseModel: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  constructor(private occupationManagementService: OccupationManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    var path = location.pathname.split('/');
    this.occupationId = +(path[4]);
    this.getInstituteOccupationDetail();
  }

  getInstituteOccupationDetail() {
    this.loaderService.toggleLoader(true);
    this.occupationManagementService.getInstituteOccupationDetail(this.occupationId).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['student', 'lookup', 'occupation', 'list']);
      } else {
        this.baseModel.Name = response.name;
        this.baseModel.Code = response.code;
        this.baseModel.Description = response.description;
        this.baseModel.Status = response.status;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  updateInstituteOccupation(updateOccupation: BaseModelLookUp) {
    this.loaderService.toggleLoader(true);
    var updateData = {
      Name: updateOccupation.Name, Code: updateOccupation.Code, OccupationId: this.occupationId,
      Description: updateOccupation.Description, Status: updateOccupation.Status
    }
    this.occupationManagementService.updateInstituteOccupation(updateData).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'lookup', 'occupation', 'list']);
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
