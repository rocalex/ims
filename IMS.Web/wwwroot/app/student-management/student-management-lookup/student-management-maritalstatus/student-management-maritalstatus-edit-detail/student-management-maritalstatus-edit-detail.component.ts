import { Component, OnInit } from '@angular/core';
import { MaritalStatusManagementService } from '../student-management-maritalstatus.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../student-management-lookup.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-maritalstatus-edit-detail.html'
})
export class EditAndDetailMaritalStatusManagementComponent implements OnInit {
  MaritalStatusId: number;
  baseModel: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  constructor(private maritalStatusManagementService: MaritalStatusManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    var path = location.pathname.split('/');
    this.MaritalStatusId = +(path[4]);
    this.getInstituteMaritalStatusDetail();
  }

  getInstituteMaritalStatusDetail() {
    this.loaderService.toggleLoader(true);
    this.maritalStatusManagementService.getInstituteMaritalStatusDetail(this.MaritalStatusId).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['student', 'lookup', 'maritalstatus', 'list']);
      } else {
        this.baseModel.Name = response.name;
        this.baseModel.Code = response.code;
        this.baseModel.Description = response.description;
        this.baseModel.Status = response.status;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  updateInstituteMaritalStatus(updateMaritalStatus: BaseModelLookUp) {
    this.loaderService.toggleLoader(true);
    var updateData = {
      Name: updateMaritalStatus.Name, Code: updateMaritalStatus.Code, MaritalStatusId: this.MaritalStatusId,
      Description: updateMaritalStatus.Description, Status: updateMaritalStatus.Status
    }
    this.maritalStatusManagementService.updateInstituteMaritalStatus(updateData).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'lookup', 'maritalstatus', 'list']);
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
