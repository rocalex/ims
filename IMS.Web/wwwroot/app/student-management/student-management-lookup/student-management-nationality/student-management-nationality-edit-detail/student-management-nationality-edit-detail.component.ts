import { Component, OnInit } from '@angular/core';
import { NationalityManagementService } from '../student-management-nationality.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../student-management-lookup.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-nationality-edit-detail.html'
})
export class EditAndDetailNationalityManagementComponent implements OnInit {
  nationalityId: number;
  baseModel: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  constructor(private nationalityManagementService: NationalityManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    var path = location.pathname.split('/');
    this.nationalityId = +(path[4]);
    this.getInstituteNationalityDetail();
  }

  getInstituteNationalityDetail() {
    this.loaderService.toggleLoader(true);
    this.nationalityManagementService.getInstituteNationalityDetail(this.nationalityId).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['student', 'lookup', 'nationality', 'list']);
      } else {
        this.baseModel.Name = response.name;
        this.baseModel.Code = response.code;
        this.baseModel.Description = response.description;
        this.baseModel.Status = response.status;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  updateInstituteNationality(updateNationality: BaseModelLookUp) {
    this.loaderService.toggleLoader(true);
    var updateData = {
      Name: updateNationality.Name, Code: updateNationality.Code, NationalityId: this.nationalityId,
      Description: updateNationality.Description, Status: updateNationality.Status
    }
    this.nationalityManagementService.updateInstituteNationality(updateData).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'lookup', 'nationality', 'list']);
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
