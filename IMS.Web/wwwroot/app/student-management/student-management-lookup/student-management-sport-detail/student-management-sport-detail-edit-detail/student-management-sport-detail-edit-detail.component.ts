import { Component, OnInit } from '@angular/core';
import { SportDetailManagementService } from '../student-management-sport-detail.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../student-management-lookup.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-sport-detail-edit-detail.html'
})
export class EditAndDetailSportDetailManagementComponent implements OnInit {
  sportDetailId: number;
  baseModel: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  constructor(private sportDetailManagementService: SportDetailManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    var path = location.pathname.split('/');
    this.sportDetailId = +(path[4]);
    this.getInstituteSportDetailDetail();
  }

  getInstituteSportDetailDetail() {
    this.loaderService.toggleLoader(true);
    this.sportDetailManagementService.getInstituteSportDetailDetail(this.sportDetailId).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['student', 'lookup', 'sportdetail', 'list']);
      } else {
        this.baseModel.Name = response.name;
        this.baseModel.Code = response.code;
        this.baseModel.Description = response.description;
        this.baseModel.Status = response.status;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  updateInstituteSportDetail(updateSportDetail: BaseModelLookUp) {
    this.loaderService.toggleLoader(true);
    var updateData = {
      Name: updateSportDetail.Name, Code: updateSportDetail.Code, SportDetailId: this.sportDetailId,
      Description: updateSportDetail.Description, Status: updateSportDetail.Status
    }
    this.sportDetailManagementService.updateInstituteSportDetail(updateData).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'lookup', 'sportdetail', 'list']);
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
