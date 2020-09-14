import { Component, OnInit } from '@angular/core';
import { ReligionCategoryManagementService } from '../student-management-religion-category.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../student-management-lookup.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-religion-category-edit-detail.html'
})
export class EditAndDetailReligionCategoryManagementComponent implements OnInit {
  religionCategoryId: number;
  baseModel: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  constructor(private religionCategoryManagementService: ReligionCategoryManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    var path = location.pathname.split('/');
    this.religionCategoryId = +(path[4]);
    this.getInstituteReligionCategoryDetail();
  }

  getInstituteReligionCategoryDetail() {
    this.loaderService.toggleLoader(true);
    this.religionCategoryManagementService.getInstituteReligionCategoryDetail(this.religionCategoryId).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['student', 'lookup', 'religioncategory', 'list']);
      } else {
        this.baseModel.Name = response.name;
        this.baseModel.Code = response.code;
        this.baseModel.Description = response.description;
        this.baseModel.Status = response.status;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  updateInstituteReligionCategory(updateReligionCategory: BaseModelLookUp) {
    this.loaderService.toggleLoader(true);
    var updateData = {
      Name: updateReligionCategory.Name, Code: updateReligionCategory.Code, ReligionCategoryId: this.religionCategoryId,
      Description: updateReligionCategory.Description, Status: updateReligionCategory.Status
    }
    this.religionCategoryManagementService.updateInstituteReligionCategory(updateData).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'lookup', 'religioncategory', 'list']);
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
