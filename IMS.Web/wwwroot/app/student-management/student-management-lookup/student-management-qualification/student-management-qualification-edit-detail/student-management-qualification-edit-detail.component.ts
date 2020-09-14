import { Component, OnInit } from '@angular/core';
import { QualificationManagementService } from '../student-management-qualification.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../student-management-lookup.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-qualification-edit-detail.html'
})
export class EditAndDetailQualificationManagementComponent implements OnInit {
  qualificationId: number;
  baseModel: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  constructor(private qualificationManagementService: QualificationManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    var path = location.pathname.split('/');
    this.qualificationId = +(path[4]);
    this.getInstituteQualificationDetail();
  }

  getInstituteQualificationDetail() {
    this.loaderService.toggleLoader(true);
    this.qualificationManagementService.getInstituteQualificationDetail(this.qualificationId).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['student', 'lookup', 'qualification', 'list']);
      } else {
        this.baseModel.Name = response.name;
        this.baseModel.Code = response.code;
        this.baseModel.Description = response.description;
        this.baseModel.Status = response.status;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  updateInstituteQualification(updateQualification: BaseModelLookUp) {
    this.loaderService.toggleLoader(true);
    var updateData = {
      Name: updateQualification.Name, Code: updateQualification.Code, QualificationId: this.qualificationId,
      Description: updateQualification.Description, Status: updateQualification.Status
    }
    this.qualificationManagementService.updateInstituteQualification(updateData).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'lookup', 'qualification', 'list']);
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
